import express from 'express'
import cors from 'cors'
import { analyzeCardiovascularRisk, generatePersonalizedRecommendations } from './src/services.js'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { patientDataSchema } from './src/validators/patientSchema.js'
import pino from 'pino'
import pinoHttp from 'pino-http'
import { randomUUID, timingSafeEqual } from 'node:crypto'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean)
const REQUIRE_API_KEY = process.env.REQUIRE_API_KEY === 'true'
const SERVICE_API_KEY = process.env.SERVICE_API_KEY || ''
const ENABLE_AUDIT_ENDPOINT = process.env.ENABLE_AUDIT_ENDPOINT === 'true'
const AUDIT_LOG_LIMIT = Number(process.env.AUDIT_LOG_LIMIT || 300)

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'req.headers.x-api-key'],
    remove: true,
  },
})

const auditTrail = []

function appendAudit(event) {
  auditTrail.push({ ts: new Date().toISOString(), ...event })
  if (auditTrail.length > AUDIT_LOG_LIMIT) {
    auditTrail.shift()
  }
}

function maskPatientId(id) {
  if (!id || typeof id !== 'string') return 'unknown'
  if (id.length <= 4) return `${id.slice(0, 1)}***`
  return `${id.slice(0, 2)}***${id.slice(-2)}`
}

function apiKeyIsValid(provided) {
  if (!SERVICE_API_KEY || !provided) return false
  const expected = Buffer.from(SERVICE_API_KEY)
  const incoming = Buffer.from(provided)
  if (expected.length !== incoming.length) return false
  return timingSafeEqual(expected, incoming)
}

function requireServiceApiKey(req, res, next) {
  if (!REQUIRE_API_KEY) {
    return next()
  }

  const provided = req.header('x-api-key') || ''
  if (!apiKeyIsValid(provided)) {
    appendAudit({
      requestId: req.id,
      route: req.path,
      method: req.method,
      outcome: 'unauthorized',
      ip: req.ip,
    })
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API key inválida ou ausente.',
    })
  }

  return next()
}

function requestAuditMiddleware(req, res, next) {
  const startedAt = Date.now()
  const requestId = req.id

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt
    const event = {
      requestId,
      route: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      outcome: res.statusCode >= 400 ? 'error' : 'ok',
    }
    appendAudit(event)
    req.log.info(event, 'request_completed')
  })

  next()
}

app.disable('x-powered-by')

// Middleware
app.use(helmet())
app.use(
  pinoHttp({
    logger,
    genReqId: (req, res) => {
      const existing = req.headers['x-request-id']
      const requestId = typeof existing === 'string' && existing ? existing : randomUUID()
      res.setHeader('x-request-id', requestId)
      return requestId
    },
  })
)
app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin tools/health checks without Origin header.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed by CORS'))
    },
  })
)
app.use(express.json({ limit: '100kb' }))
app.use(requestAuditMiddleware)

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', apiLimiter)
app.use('/api', requireServiceApiKey)

function validatePatientData(req, res, next) {
  const parsed = patientDataSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid request payload',
      message: 'Os dados enviados não estão no formato esperado.',
      details: parsed.error.issues.slice(0, 5).map((issue) => ({
        path: issue.path.join('.'),
        reason: issue.message,
      })),
    })
  }

  req.body = parsed.data
  next()
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cardiora AI API is running' })
})

if (ENABLE_AUDIT_ENDPOINT) {
  app.get('/internal/audit', requireServiceApiKey, (req, res) => {
    res.json({ count: auditTrail.length, items: auditTrail })
  })
}

// Analyze risk endpoint
app.post('/api/analyze-risk', validatePatientData, async (req, res) => {
  try {
    const patientData = req.body
    
    if (!patientData || !patientData.id_paciente) {
      return res.status(400).json({ error: 'Patient data is required' })
    }

    const analysis = await analyzeCardiovascularRisk(patientData)
    appendAudit({
      requestId: req.id,
      route: '/api/analyze-risk',
      method: 'POST',
      action: 'risk_analysis_generated',
      patientRef: maskPatientId(patientData.id_paciente),
      outcome: 'ok',
    })
    res.json({ analysis, success: true })
  } catch (error) {
    console.error('Error analyzing risk:', error)
    res.status(500).json({ 
      error: 'Failed to analyze cardiovascular risk',
      message: 'Falha interna ao processar análise de risco.'
    })
  }
})

// Get recommendations endpoint
app.post('/api/get-recommendations', validatePatientData, async (req, res) => {
  try {
    const patientData = req.body
    
    if (!patientData || !patientData.id_paciente) {
      return res.status(400).json({ error: 'Patient data is required' })
    }

    // Get current risk analysis first
    const riskAnalysis = await analyzeCardiovascularRisk(patientData)
    
    // Generate recommendations based on the risk analysis
    const recommendations = await generatePersonalizedRecommendations(
      patientData,
      riskAnalysis
    )

    appendAudit({
      requestId: req.id,
      route: '/api/get-recommendations',
      method: 'POST',
      action: 'recommendations_generated',
      patientRef: maskPatientId(patientData.id_paciente),
      outcome: 'ok',
    })
    
    res.json({ recommendations, success: true })
  } catch (error) {
    console.error('Error getting recommendations:', error)
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: 'Falha interna ao processar recomendações.'
    })
  }
})

app.use((error, req, res, next) => {
  if (error?.message === 'Origin not allowed by CORS') {
    req.log.warn({ origin: req.headers.origin }, 'cors_blocked')
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Origem não permitida por política de CORS.',
    })
  }

  req.log.error({ err: error }, 'unhandled_error')
  return res.status(500).json({
    error: 'Internal server error',
    message: 'Falha interna inesperada.',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Cardiora AI API server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})

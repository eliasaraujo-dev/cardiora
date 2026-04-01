import { AnalysisResponse, PatientData, RecommendationResponse } from '../types'
import { postJson } from './httpClient'

export function analyzeRisk(patientData: PatientData): Promise<AnalysisResponse> {
  return postJson<AnalysisResponse, PatientData>('/api/analyze-risk', patientData)
}

export function getRecommendations(
  patientData: PatientData
): Promise<RecommendationResponse> {
  return postJson<RecommendationResponse, PatientData>(
    '/api/get-recommendations',
    patientData
  )
}

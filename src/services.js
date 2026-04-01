import axios from 'axios'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = 'llama-3.1-8b-instant'

function computeRiskSummary(patientData) {
  const idade = Number(patientData?.dados_pessoais?.idade || 0)
  const historico = patientData?.historico_medico || {}
  const estilo = patientData?.estilo_de_vida || {}
  const colesterol = historico?.Nivel_Colesterol_Ultimo_Exame || {}

  const ldl = Number(colesterol?.LDL_Colesterol_mg_dL || 0)
  const hdl = Number(colesterol?.HDL_Colesterol_mg_dL || 0)
  const triglicerideos = Number(colesterol?.Triglicerideos_mg_dL || 0)
  const atividade = Number(estilo?.Atividade_Fisica_Semanal_Minutos || 0)
  const sono = Number(estilo?.Horas_Sono_Media_Noite || 0)

  let score = 0
  const fatores = []

  if (idade >= 55) {
    score += 2
    fatores.push('Idade em faixa de maior risco cardiovascular')
  }
  if (historico?.Diagnostico_Hipertensao === 'Sim') {
    score += 2
    fatores.push('Hipertensão arterial relatada')
  }
  if (historico?.Diagnostico_Diabetes === 'Sim') {
    score += 2
    fatores.push('Diabetes como fator de risco cardiometabólico')
  }
  if (historico?.Historico_Familiar_DCV === 'Sim') {
    score += 2
    fatores.push('Histórico familiar de doença cardiovascular')
  }
  if (ldl >= 130) {
    score += 2
    fatores.push(`LDL elevado (${ldl} mg/dL)`)
  }
  if (hdl > 0 && hdl < 40) {
    score += 1
    fatores.push(`HDL reduzido (${hdl} mg/dL)`)
  }
  if (triglicerideos >= 150) {
    score += 1
    fatores.push(`Triglicerídeos elevados (${triglicerideos} mg/dL)`)
  }
  if (atividade < 150) {
    score += 1
    fatores.push('Atividade física abaixo do recomendado (<150 min/semana)')
  }
  if (estilo?.Tabagismo_Status === 'Fumante Atual') {
    score += 2
    fatores.push('Tabagismo ativo')
  }
  if (estilo?.Nivel_Estresse_Percebido === 'Alto') {
    score += 1
    fatores.push('Estresse percebido elevado')
  }
  if (sono > 0 && sono < 6) {
    score += 1
    fatores.push('Sono insuficiente (<6 horas/noite)')
  }

  let nivel = 'Baixo'
  if (score >= 8) {
    nivel = 'Muito Alto'
  } else if (score >= 6) {
    nivel = 'Alto'
  } else if (score >= 3) {
    nivel = 'Moderado'
  }

  return { nivel, fatores, score, ldl, hdl, triglicerideos, atividade }
}

function buildFallbackAnalysis(patientData) {
  const { nivel, fatores } = computeRiskSummary(patientData)
  const fatoresTexto = fatores.length
    ? fatores.map((f, i) => `${i + 1}. ${f}`).join('\n')
    : '1. Não foram identificados fatores de risco relevantes nos dados informados.'

  return [
    'Análise de Risco Cardiovascular (modo local de contingência):',
    '',
    '1. Fatores de risco identificados',
    fatoresTexto,
    '',
    `2. Nível de risco geral: ${nivel}`,
    '',
    '3. Recomendações para avaliação profissional',
    '- Realizar avaliação clínica com médico/cardiologista para confirmação diagnóstica.',
    '- Levar histórico de exames laboratoriais recentes (perfil lipídico, glicemia e pressão arterial).',
    '- Repetir monitoramento periódico conforme orientação médica.',
    '',
    'Aviso: esta análise automatizada não substitui consulta médica.'
  ].join('\n')
}

function buildFallbackRecommendations(patientData) {
  const { nivel, ldl, triglicerideos, atividade } = computeRiskSummary(patientData)
  const estilo = patientData?.estilo_de_vida || {}

  const recomendacoes = [
    'Recomendações Preventivas Personalizadas (modo local de contingência):',
    '',
    `Nível de risco estimado: ${nivel}`,
    '',
    '1. Estilo de vida',
    atividade < 150
      ? `- Aumentar atividade física gradualmente para pelo menos 150 min/semana (atual: ${atividade} min/semana).`
      : '- Manter rotina de atividade física regular.',
    ldl >= 130
      ? `- Priorizar dieta cardioprotetora para reduzir LDL (atual: ${ldl} mg/dL): fibras, vegetais, menos ultraprocessados e gorduras trans.`
      : '- Manter alimentação balanceada com foco em prevenção cardiovascular.',
    triglicerideos >= 150
      ? `- Reduzir açúcares simples e álcool para controle de triglicerídeos (atual: ${triglicerideos} mg/dL).`
      : '- Manter controle de triglicerídeos com dieta equilibrada.',
    estilo?.Nivel_Estresse_Percebido === 'Alto'
      ? '- Implementar técnicas de manejo do estresse (respiração, pausas, atividade relaxante diária).'
      : '- Preservar hábitos de gerenciamento de estresse.',
    '',
    '2. Rastreamento e acompanhamento',
    '- Agendar consulta médica para avaliação completa de risco cardiovascular.',
    '- Discutir periodicidade de exames (perfil lipídico, pressão arterial, glicemia e função renal).',
    '',
    '3. Fatores ambientais',
    '- Em dias de pior qualidade do ar, evitar exercício intenso ao ar livre e priorizar horários de menor poluição.',
    '',
    '4. Aspectos genéticos',
    '- Se houver suspeita de predisposição familiar/genética, discutir investigação com profissional de saúde.',
    '',
    'Importante: estas recomendações não substituem orientação médica profissional.'
  ]

  return recomendacoes.join('\n')
}

export async function analyzeCardiovascularRisk(patientData) {
  const dataJson = JSON.stringify(patientData, null, 2)

  const prompt = `
Você é um assistente de análise de saúde preventiva especializado em cardiologia.
Analise os seguintes dados de um indivíduo e identifique os principais fatores de risco cardiovascular.
Considere a combinação de fatores genômicos, histórico médico, estilo de vida e dados ambientais.
Forneça um resumo conciso dos fatores de risco identificados e o nível de risco geral.
Não forneça aconselhamento médico, apenas identifique os fatores de risco com base nos dados.

Dados do Indivíduo (Paciente ID: ${patientData.id_paciente}):
${dataJson}

Análise de Risco Cardiovascular:
1. Fatores de Risco Identificados
2. Nível de Risco Geral (Baixo/Moderado/Alto/Muito Alto)
3. Recomendações para Avaliação Profissional
`

  if (!GROQ_API_KEY) {
    return buildFallbackAnalysis(patientData)
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    )
    return response.data.choices[0].message.content
  } catch (error) {
    const providerMessage = error?.response?.data?.error?.message || error.message
    console.error('Erro ao analisar risco cardiovascular:', providerMessage)
    return `${buildFallbackAnalysis(patientData)}\n\n[Observação técnica: API externa indisponível.]`
  }
}

export async function generatePersonalizedRecommendations(patientData, riskAnalysis) {
  const dataJson = JSON.stringify(patientData, null, 2)

  const prompt = `
Você é um assistente de saúde preventiva com foco em medicina de precisão e cardiologia.
Com base nos seguintes dados de um indivíduo e na análise de risco cardiovascular, gere recomendações preventivas personalizadas.
As recomendações devem ser práticas, acionáveis e baseadas em evidências científicas, focando em:

1. MUDANÇAS NO ESTILO DE VIDA
   - Dieta e nutrição específica
   - Programa de exercícios personalizado
   - Gerenciamento de sono
   - Técnicas de gerenciamento de estresse

2. SUGESTÕES DE RASTREAMENTO E ACOMPANHAMENTO
   - Exames recomendados
   - Frequência de acompanhamento médico
   - Importante: sempre ressalte a necessidade de consultar um médico

3. CONSIDERAÇÕES AMBIENTAIS
   - Como fatores ambientais (qualidade do ar, poluição sonora) podem impactar saúde
   - Possíveis mitigações

4. CONSIDERAÇÕES GENÉTICAS
   - Se aplicável, mencionar a importância de discutir predisposições genéticas com um profissional

Dados do Indivíduo (Paciente ID: ${patientData.id_paciente}):
${dataJson}

Análise Prévia:
${riskAnalysis}

IMPORTANTE: As recomendações NÃO substituem o aconselhamento médico profissional. Sempre indique que o usuário deve consultar um médico para decisões de saúde.

Recomendações Preventivas Personalizadas:
`

  if (!GROQ_API_KEY) {
    return buildFallbackRecommendations(patientData)
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2048,
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    )
    return response.data.choices[0].message.content
  } catch (error) {
    const providerMessage = error?.response?.data?.error?.message || error.message
    console.error('Erro ao gerar recomendações:', providerMessage)
    return `${buildFallbackRecommendations(patientData)}\n\n[Observação técnica: API externa indisponível.]`
  }
}

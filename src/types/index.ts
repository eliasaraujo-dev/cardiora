// Personal Data
export interface PersonalData {
  idade: number
  sexo_biologico: 'Masculino' | 'Feminino'
}

// Genomic Data
export interface GenomicData {
  Variante_Genetica_Colesterol: 'Presente' | 'Ausente' | 'Não Informado'
  Polimorfismo_APOE: string
}

// Cholesterol Levels
export interface CholesterolLevels {
  LDL_Colesterol_mg_dL: number
  HDL_Colesterol_mg_dL: number
  Triglicerideos_mg_dL: number
}

// Medical History
export interface MedicalHistory {
  Historico_Familiar_DCV: 'Sim' | 'Não' | 'Não Informado'
  Diagnostico_Hipertensao: 'Sim' | 'Não' | 'Não Informado'
  Pressao_Arterial_Sistolica_mmHg?: number
  Pressao_Arterial_Diastolica_mmHg?: number
  Diagnostico_Diabetes: 'Sim' | 'Não' | 'Não Informado'
  Nivel_Colesterol_Ultimo_Exame: CholesterolLevels
  Medicacoes_Uso: string[]
}

// Lifestyle
export interface LifestyleData {
  Alimentacao_Tipo: string
  Frequencia_Alimentacao_Processada?: 'Baixa' | 'Média' | 'Alta'
  Atividade_Fisica_Semanal_Minutos: number
  Atividade_Fisica_Tipo?: string
  Tabagismo_Status: 'Não Fumante' | 'Ex-Fumante' | 'Fumante Atual' | 'Não Informado'
  Anos_Desde_Cessacao_Tabagismo?: number
  Consumo_Alcool_Frequencia: 'Nenhum' | 'Ocasional' | 'Semanal' | 'Diário' | 'Não Informado'
  Consumo_Alcool_Doses_Por_Vez?: number
  Nivel_Estresse_Percebido: 'Baixo' | 'Médio' | 'Alto' | 'Não Informado'
  Horas_Sono_Media_Noite: number
}

// Environmental Data
export interface EnvironmentalData {
  Cidade_Residencia: string
  Bairro_Residencia_Simulado?: string
  Qualidade_Ar_Regiao?: string
  Exposicao_Poluicao_Sonora?: 'Baixa' | 'Média' | 'Alta'
}

// Patient Data (Complete)
export interface PatientData {
  id_paciente: string
  dados_pessoais: PersonalData
  dados_genomicos: GenomicData
  historico_medico: MedicalHistory
  estilo_de_vida: LifestyleData
  dados_ambientais: EnvironmentalData
}

// API Response Types
export interface AnalysisResponse {
  analysis: string
  riskLevel?: 'Baixo' | 'Moderado' | 'Alto' | 'Muito Alto'
}

export interface RecommendationResponse {
  recommendations: string
}

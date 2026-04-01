import { z } from 'zod'

const simNaoNaoInformado = z.enum(['Sim', 'Não', 'Não Informado'])
const tabagismoStatus = z.enum([
  'Não Fumante',
  'Ex-Fumante',
  'Fumante Atual',
  'Não Informado',
])
const alcoolFrequencia = z.enum([
  'Nenhum',
  'Ocasional',
  'Semanal',
  'Diário',
  'Não Informado',
])

const cholesterolSchema = z.object({
  LDL_Colesterol_mg_dL: z.number().min(0).max(400),
  HDL_Colesterol_mg_dL: z.number().min(0).max(200),
  Triglicerideos_mg_dL: z.number().min(0).max(1000),
})

export const patientDataSchema = z.object({
  id_paciente: z.string().min(1).max(64),
  dados_pessoais: z.object({
    idade: z.number().int().min(18).max(120),
    sexo_biologico: z.enum(['Masculino', 'Feminino']),
  }),
  dados_genomicos: z.object({
    Variante_Genetica_Colesterol: z.enum(['Presente', 'Ausente', 'Não Informado']),
    Polimorfismo_APOE: z.string().max(32),
  }),
  historico_medico: z.object({
    Historico_Familiar_DCV: simNaoNaoInformado,
    Diagnostico_Hipertensao: simNaoNaoInformado,
    Pressao_Arterial_Sistolica_mmHg: z.number().int().min(50).max(260).optional(),
    Pressao_Arterial_Diastolica_mmHg: z.number().int().min(30).max(180).optional(),
    Diagnostico_Diabetes: simNaoNaoInformado,
    Nivel_Colesterol_Ultimo_Exame: cholesterolSchema,
    Medicacoes_Uso: z.array(z.string().max(120)).max(30),
  }),
  estilo_de_vida: z.object({
    Alimentacao_Tipo: z.string().max(80),
    Frequencia_Alimentacao_Processada: z.enum(['Baixa', 'Média', 'Alta']).optional(),
    Atividade_Fisica_Semanal_Minutos: z.number().int().min(0).max(3000),
    Atividade_Fisica_Tipo: z.string().max(80).optional(),
    Tabagismo_Status: tabagismoStatus,
    Anos_Desde_Cessacao_Tabagismo: z.number().int().min(0).max(80).optional(),
    Consumo_Alcool_Frequencia: alcoolFrequencia,
    Consumo_Alcool_Doses_Por_Vez: z.number().int().min(0).max(30).optional(),
    Nivel_Estresse_Percebido: z.enum(['Baixo', 'Médio', 'Alto', 'Não Informado']),
    Horas_Sono_Media_Noite: z.number().min(0).max(24),
  }),
  dados_ambientais: z.object({
    Cidade_Residencia: z.string().max(100),
    Bairro_Residencia_Simulado: z.string().max(100).optional(),
    Qualidade_Ar_Regiao: z.string().max(100).optional(),
    Exposicao_Poluicao_Sonora: z.enum(['Baixa', 'Média', 'Alta']).optional(),
  }),
})

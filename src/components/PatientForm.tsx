import { useState } from 'react'
import { PatientData } from '../types'
import './PatientForm.css'

interface PatientFormProps {
  onSubmit: (data: PatientData) => void
  isLoading: boolean
}

export default function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    id_paciente: `P${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    dados_pessoais: {
      idade: 50,
      sexo_biologico: 'Masculino',
    },
    dados_genomicos: {
      Variante_Genetica_Colesterol: 'Não Informado',
      Polimorfismo_APOE: 'e3/e3',
    },
    historico_medico: {
      Historico_Familiar_DCV: 'Não Informado',
      Diagnostico_Hipertensao: 'Não Informado',
      Diagnostico_Diabetes: 'Não Informado',
      Nivel_Colesterol_Ultimo_Exame: {
        LDL_Colesterol_mg_dL: 130,
        HDL_Colesterol_mg_dL: 50,
        Triglicerideos_mg_dL: 150,
      },
      Medicacoes_Uso: [],
    },
    estilo_de_vida: {
      Alimentacao_Tipo: 'Equilibrada',
      Atividade_Fisica_Semanal_Minutos: 150,
      Tabagismo_Status: 'Não Fumante',
      Consumo_Alcool_Frequencia: 'Ocasional',
      Nivel_Estresse_Percebido: 'Médio',
      Horas_Sono_Media_Noite: 7,
    },
    dados_ambientais: {
      Cidade_Residencia: 'Rio de Janeiro',
      Bairro_Residencia_Simulado: 'Centro',
      Qualidade_Ar_Regiao: 'Moderada',
    },
  })

  const setNestedValue = (
    source: unknown,
    keys: string[],
    value: unknown
  ): Record<string, unknown> | unknown => {
    if (keys.length === 0) return value

    const [head, ...rest] = keys
    const base =
      source && typeof source === 'object'
        ? (source as Record<string, unknown>)
        : {}

    return {
      ...base,
      [head]: setNestedValue(base[head], rest, value),
    }
  }

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) =>
      setNestedValue(prev, field.split('.'), value) as PatientData
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="patient-form">
      <h2>Dados do Paciente</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Data */}
        <fieldset>
          <legend>Informações Pessoais</legend>
          <div className="form-group">
            <label htmlFor="idade">Idade *</label>
            <input
              id="idade"
              type="number"
              min="18"
              max="120"
              value={formData.dados_pessoais.idade}
              onChange={(e) =>
                handleInputChange('dados_pessoais.idade', parseInt(e.target.value))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo Biológico *</label>
            <select
              id="sexo"
              value={formData.dados_pessoais.sexo_biologico}
              onChange={(e) =>
                handleInputChange(
                  'dados_pessoais.sexo_biologico',
                  e.target.value
                )
              }
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
        </fieldset>

        {/* Medical History */}
        <fieldset>
          <legend>Histórico Médico</legend>
          <div className="form-group">
            <label htmlFor="hipertensao">Diagnóstico de Hipertensão</label>
            <select
              id="hipertensao"
              value={formData.historico_medico.Diagnostico_Hipertensao}
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Diagnostico_Hipertensao',
                  e.target.value
                )
              }
            >
              <option value="Não Informado">Não Informado</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="diabetes">Diagnóstico de Diabetes</label>
            <select
              id="diabetes"
              value={formData.historico_medico.Diagnostico_Diabetes}
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Diagnostico_Diabetes',
                  e.target.value
                )
              }
            >
              <option value="Não Informado">Não Informado</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="historico_familiar">Histórico Familiar de Doença Cardiovascular</label>
            <select
              id="historico_familiar"
              value={formData.historico_medico.Historico_Familiar_DCV}
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Historico_Familiar_DCV',
                  e.target.value
                )
              }
            >
              <option value="Não Informado">Não Informado</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </fieldset>

        {/* Cholesterol Levels */}
        <fieldset>
          <legend>Níveis de Colesterol (mg/dL)</legend>
          <div className="form-group">
            <label htmlFor="ldl">LDL Colesterol *</label>
            <input
              id="ldl"
              type="number"
              min="0"
              value={
                formData.historico_medico.Nivel_Colesterol_Ultimo_Exame
                  .LDL_Colesterol_mg_dL
              }
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Nivel_Colesterol_Ultimo_Exame.LDL_Colesterol_mg_dL',
                  parseInt(e.target.value)
                )
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hdl">HDL Colesterol *</label>
            <input
              id="hdl"
              type="number"
              min="0"
              value={
                formData.historico_medico.Nivel_Colesterol_Ultimo_Exame
                  .HDL_Colesterol_mg_dL
              }
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Nivel_Colesterol_Ultimo_Exame.HDL_Colesterol_mg_dL',
                  parseInt(e.target.value)
                )
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="triglicerideos">Triglicerídeos *</label>
            <input
              id="triglicerideos"
              type="number"
              min="0"
              value={
                formData.historico_medico.Nivel_Colesterol_Ultimo_Exame
                  .Triglicerideos_mg_dL
              }
              onChange={(e) =>
                handleInputChange(
                  'historico_medico.Nivel_Colesterol_Ultimo_Exame.Triglicerideos_mg_dL',
                  parseInt(e.target.value)
                )
              }
              required
            />
          </div>
        </fieldset>

        {/* Lifestyle */}
        <fieldset>
          <legend>Estilo de Vida</legend>
          <div className="form-group">
            <label htmlFor="alimentacao">Tipo de Alimentação</label>
            <select
              id="alimentacao"
              value={formData.estilo_de_vida.Alimentacao_Tipo}
              onChange={(e) =>
                handleInputChange('estilo_de_vida.Alimentacao_Tipo', e.target.value)
              }
            >
              <option value="Equilibrada">Equilibrada</option>
              <option value="Ocidental_Processada">Ocidental/Processada</option>
              <option value="Mediterranea">Mediterrânea</option>
              <option value="Vegetariana">Vegetariana</option>
              <option value="Baixo_Carboidrato">Baixo Carboidrato</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="atividade">Atividade Física Semanal (minutos) *</label>
            <input
              id="atividade"
              type="number"
              min="0"
              step="30"
              value={formData.estilo_de_vida.Atividade_Fisica_Semanal_Minutos}
              onChange={(e) =>
                handleInputChange(
                  'estilo_de_vida.Atividade_Fisica_Semanal_Minutos',
                  parseInt(e.target.value)
                )
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tabagismo">Status de Tabagismo</label>
            <select
              id="tabagismo"
              value={formData.estilo_de_vida.Tabagismo_Status}
              onChange={(e) =>
                handleInputChange('estilo_de_vida.Tabagismo_Status', e.target.value)
              }
            >
              <option value="Não Fumante">Não Fumante</option>
              <option value="Ex-Fumante">Ex-Fumante</option>
              <option value="Fumante Atual">Fumante Atual</option>
              <option value="Não Informado">Não Informado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="alcool">Consumo de Álcool</label>
            <select
              id="alcool"
              value={formData.estilo_de_vida.Consumo_Alcool_Frequencia}
              onChange={(e) =>
                handleInputChange(
                  'estilo_de_vida.Consumo_Alcool_Frequencia',
                  e.target.value
                )
              }
            >
              <option value="Nenhum">Nenhum</option>
              <option value="Ocasional">Ocasional</option>
              <option value="Semanal">Semanal</option>
              <option value="Diário">Diário</option>
              <option value="Não Informado">Não Informado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="estresse">Nível de Estresse Percebido</label>
            <select
              id="estresse"
              value={formData.estilo_de_vida.Nivel_Estresse_Percebido}
              onChange={(e) =>
                handleInputChange(
                  'estilo_de_vida.Nivel_Estresse_Percebido',
                  e.target.value
                )
              }
            >
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
              <option value="Não Informado">Não Informado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sono">Horas de Sono Média por Noite *</label>
            <input
              id="sono"
              type="number"
              min="3"
              max="12"
              step="0.5"
              value={formData.estilo_de_vida.Horas_Sono_Media_Noite}
              onChange={(e) =>
                handleInputChange(
                  'estilo_de_vida.Horas_Sono_Media_Noite',
                  parseFloat(e.target.value)
                )
              }
              required
            />
          </div>
        </fieldset>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Analisando...' : 'Analisar Risco Cardiovascular'}
        </button>
      </form>
    </div>
  )
}

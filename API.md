# Documentação da API - Cardiora AI

# API de Análise Cardiovascular

O Cardiora AI fornece uma API backend para processar dados de pacientes e gerar análises de risco cardiovascular usando IA.

## Base URL

```
http://localhost:3001
```

## Autenticação

Atualmente, não há autenticação implementada. Futuramente, considerar implementar:
- API Keys
- JWT tokens
- OAuth 2.0

## Endpoints

### 1. Health Check

**GET** `/health`

Verifica o status do servidor.

**Response:**
```json
{
  "status": "OK",
  "message": "Cardiora AI API is running"
}
```

---

### 2. Analisar Risco Cardiovascular

**POST** `/api/analyze-risk`

Analisa os dados do paciente e identifica fatores de risco cardiovascular.

**Request:**
```json
{
  "id_paciente": "P0001",
  "dados_pessoais": {
    "idade": 52,
    "sexo_biologico": "Masculino"
  },
  "dados_genomicos": {
    "Variante_Genetica_Colesterol": "Presente",
    "Polimorfismo_APOE": "e3/e4"
  },
  "historico_medico": {
    "Historico_Familiar_DCV": "Sim",
    "Diagnostico_Hipertensao": "Sim",
    "Pressao_Arterial_Sistolica_mmHg": 145,
    "Pressao_Arterial_Diastolica_mmHg": 92,
    "Diagnostico_Diabetes": "Não",
    "Nivel_Colesterol_Ultimo_Exame": {
      "LDL_Colesterol_mg_dL": 150,
      "HDL_Colesterol_mg_dL": 45,
      "Triglicerideos_mg_dL": 180
    },
    "Medicacoes_Uso": ["Lisinopril 10mg"]
  },
  "estilo_de_vida": {
    "Alimentacao_Tipo": "Ocidental_Processada",
    "Frequencia_Alimentacao_Processada": "Alta",
    "Atividade_Fisica_Semanal_Minutos": 60,
    "Atividade_Fisica_Tipo": "Caminhada Leve",
    "Tabagismo_Status": "Ex-Fumante",
    "Anos_Desde_Cessacao_Tabagismo": 5,
    "Consumo_Alcool_Frequencia": "Semanal",
    "Consumo_Alcool_Doses_Por_Vez": 2,
    "Nivel_Estresse_Percebido": "Alto",
    "Horas_Sono_Media_Noite": 6.0
  },
  "dados_ambientais": {
    "Cidade_Residencia": "Rio de Janeiro",
    "Bairro_Residencia_Simulado": "Centro",
    "Qualidade_Ar_Regiao_RJ": "Moderada",
    "Exposicao_Poluicao_Sonora": "Alta"
  }
}
```

**Response (200 OK):**
```json
{
  "analysis": "Análise detalhada de fatores de risco cardiovascular...",
  "success": true
}
```

**Possíveis Respostas de Erro:**

- **400 Bad Request**: Dados do paciente ausentes ou inválidos
- **500 Internal Server Error**: Erro ao processar análise

```json
{
  "error": "Failed to analyze cardiovascular risk",
  "message": "Detalhes do erro"
}
```

---

### 3. Obter Recomendações Personalizadas

**POST** `/api/get-recommendations`

Gera recomendações preventivas personalizadas baseadas nos dados do paciente.

**Request:**
```json
{
  "id_paciente": "P0001",
  "dados_pessoais": { ... },
  "dados_genomicos": { ... },
  "historico_medico": { ... },
  "estilo_de_vida": { ... },
  "dados_ambientais": { ... }
}
```

(Mesma estrutura do endpoint de análise)

**Response (200 OK):**
```json
{
  "recommendations": "Recomendações personalizadas detalhadas...",
  "success": true
}
```

**Possíveis Respostas de Erro:**

- **400 Bad Request**: Dados do paciente ausentes
- **500 Internal Server Error**: Erro ao gerar recomendações

```json
{
  "error": "Failed to generate recommendations",
  "message": "Detalhes do erro"
}
```

---

## Estrutura de Dados

### PatientData

```typescript
interface PatientData {
  id_paciente: string
  dados_pessoais: PersonalData
  dados_genomicos: GenomicData
  historico_medico: MedicalHistory
  estilo_de_vida: LifestyleData
  dados_ambientais: EnvironmentalData
}
```

### PersonalData

```typescript
interface PersonalData {
  idade: number          // 18-120
  sexo_biologico: string // "Masculino" | "Feminino"
}
```

### GenomicData

```typescript
interface GenomicData {
  Variante_Genetica_Colesterol: string    // "Presente" | "Ausente" | "Não Informado"
  Polimorfismo_APOE: string                // Ex: "e3/e3", "e3/e4", etc.
}
```

### MedicalHistory

```typescript
interface MedicalHistory {
  Historico_Familiar_DCV: string
  Diagnostico_Hipertensao: string
  Pressao_Arterial_Sistolica_mmHg?: number
  Pressao_Arterial_Diastolica_mmHg?: number
  Diagnostico_Diabetes: string
  Nivel_Colesterol_Ultimo_Exame: CholesterolLevels
  Medicacoes_Uso: string[]
}
```

### CholesterolLevels

```typescript
interface CholesterolLevels {
  LDL_Colesterol_mg_dL: number      // Colesterol "ruim"
  HDL_Colesterol_mg_dL: number      // Colesterol "bom"
  Triglicerideos_mg_dL: number
}
```

### LifestyleData

```typescript
interface LifestyleData {
  Alimentacao_Tipo: string                    // Dieta
  Frequencia_Alimentacao_Processada?: string  // Frequência
  Atividade_Fisica_Semanal_Minutos: number
  Atividade_Fisica_Tipo?: string
  Tabagismo_Status: string                    // Status de fumo
  Anos_Desde_Cessacao_Tabagismo?: number
  Consumo_Alcool_Frequencia: string
  Consumo_Alcool_Doses_Por_Vez?: number
  Nivel_Estresse_Percebido: string           // "Baixo" | "Médio" | "Alto"
  Horas_Sono_Media_Noite: number
}
```

### EnvironmentalData

```typescript
interface EnvironmentalData {
  Cidade_Residencia: string
  Bairro_Residencia_Simulado?: string
  Qualidade_Ar_Regiao?: string
  Exposicao_Poluicao_Sonora?: string
}
```

---

## Exemplos de Uso

### cURL

**Análise de Risco:**
```bash
curl -X POST http://localhost:3001/api/analyze-risk \
  -H "Content-Type: application/json" \
  -d @patient-data.json
```

### JavaScript/Fetch

```javascript
const patientData = {
  id_paciente: "P0001",
  dados_pessoais: {
    idade: 45,
    sexo_biologico: "Feminino"
  },
  // ... resto dos dados
}

const response = await fetch('http://localhost:3001/api/analyze-risk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(patientData),
})

if (response.ok) {
  const result = await response.json()
  console.log(result.analysis)
} else {
  console.error('Erro:', response.status, response.statusText)
}
```

### Python

```python
import requests
import json

url = 'http://localhost:3001/api/analyze-risk'

patient_data = {
    "id_paciente": "P0001",
    "dados_pessoais": {
        "idade": 50,
        "sexo_biologico": "Masculino"
    },
    # ... resto dos dados
}

response = requests.post(url, json=patient_data)

if response.status_code == 200:
    result = response.json()
    print(result['analysis'])
else:
    print(f'Erro: {response.status_code}')
    print(response.json())
```

---

## Tratamento de Erros

### Possíveis Erros

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 400 | Requisição inválida (dados faltando) |
| 500 | Erro interno do servidor |

### Exemplo de Erro

```json
{
  "error": "Failed to analyze cardiovascular risk",
  "message": "API key not configured",
  "status": 500
}
```

---

## Limitações e Considerações

### Taxa de Requisições

- Não há limites de taxa implementados atualmente
- Considerar implementar futuramente para evitar abuso

### Limites de Dados

- Máximo não especificado atualmente
- IDs de pacientes devem ser únicos por sessão

### Segurança

⚠️ **Aviso**: Esta API processa dados de saúde sensíveis. Implementar em produção:
- HTTPS obrigatório
- Autenticação robusta
- Autorização por usuário
- Validação de entrada rigorosa
- Logging de auditoria
- Conformidade LGPD/HIPAA

---

## Roadmap da API

- [ ] Autenticação com JWT
- [ ] Rate limiting
- [ ] Histórico de análises por paciente
- [ ] Exportação de relatórios em PDF
- [ ] Múltiplas versões de modelos de IA
- [ ] Integração com EHR (Electronic Health Records)
- [ ] WebSocket para análises em tempo real

---

## Suporte

Para problemas com a API:

1. Verifique se o servidor está rodando: `http://localhost:3001/health`
2. Verifique a Google API Key em `.env`
3. Consulte os logs do servidor
4. Abra uma issue no repositório

---

**Última atualização**: Abril 2026
**Versão da API**: 1.0.0

# Cardiora AI 🫀

Sistema de análise preditiva para riscos cardiovasculares.

Desenvolvido como parte da Imersão Alura, o Cardiora AI utiliza IA via Groq para analisar dados heterogêneos de pacientes e gerar recomendações preventivas personalizadas.

## Aviso de Uso Educacional

Este projeto é disponibilizado para fins educacionais, demonstração técnica e pesquisa em engenharia de software.

As saídas geradas pelo sistema não devem ser usadas como diagnóstico, prescrição ou decisão clínica isolada. O Cardiora AI não substitui avaliação, conduta e acompanhamento por profissional de saúde habilitado.

## Características

- Análise de risco cardiovascular com dados genômicos, médicos, estilo de vida e ambientais.
- Recomendações preventivas personalizadas.
- Relatório com opção de impressão e download.
- Fallback local quando a API externa está indisponível.
- Frontend responsivo com React + TypeScript.

## Stack Tecnológico

### Frontend
- React 18
- TypeScript
- Vite
- CSS3

### Backend
- Node.js
- Express
- Zod (validação)
- Helmet + Rate Limit (hardening)
- Pino (logs estruturados)

### IA
- Groq API (OpenAI-compatible)
- Modelo padrão: Llama 3.1 8B Instant

## Requisitos

- Node.js 18+
- npm
- Chave da Groq: https://console.groq.com/keys

## Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/cardiora.git
cd cardiora
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Exemplo mínimo para backend:

```env
GROQ_API_KEY=sua_chave_api_aqui
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
```

### 4. Configurar frontend

No `.env.development`:

```env
VITE_API_URL=http://localhost:3001
```

## Uso

### Desenvolvimento

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run dev:server
```

Ou ambos juntos:

```bash
npm run dev:all
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

### Build de produção

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Estrutura do Projeto

```text
cardiora/
├── src/
│   ├── components/
│   │   ├── PatientForm.tsx
│   │   ├── RiskAnalysis.tsx
│   │   ├── RecommendationPanel.tsx
│   │   └── TextLines.tsx
│   ├── services/
│   │   ├── cardioApi.ts
│   │   └── httpClient.ts
│   ├── validators/
│   │   └── patientSchema.js
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── services.js
│   └── vite-env.d.ts
├── .github/
├── server.js
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .env.development
├── LICENSE
└── README.md
```

## Aviso Importante ⚠️

As análises fornecidas por este sistema não substituem aconselhamento médico profissional. Sempre consulte um médico qualificado para diagnóstico, conduta e acompanhamento.

## Contribuindo

Contribuições são bem-vindas. Abra uma issue ou pull request.

## Releases e Changelog

- Versão inicial publicada: v0.1.0
- Histórico de mudanças: veja `CHANGELOG.md`

## Licença

MIT. Consulte o arquivo `LICENSE`.

# Cardiora AI 🫀

Sistema de Análise Preditiva para Riscos Cardiovasculares

Desenvolvido como parte da Imersão Alura, Cardiora AI é uma aplicação web moderna que utiliza inteligência artificial (Google Gemini) para analisar dados heterogêneos de pacientes e fornecer recomendações personalizadas para prevenção cardiovascular.

## Aviso de Uso Educacional

Este projeto é disponibilizado para fins educacionais, demonstração técnica e pesquisa em engenharia de software.

As saídas geradas pelo sistema não devem ser usadas como diagnóstico, prescrição ou decisão clínica isolada. O Cardiora AI não substitui avaliação, conduta e acompanhamento por profissional de saúde habilitado.

## Características

✨ **Análise Intelligente de Risco**
- Processamento de dados heterogêneos (genômicos, médicos, estilo de vida, ambientais)
- Análise integrada com IA para identificação de fatores de risco
- Recomendações personalizadas baseadas em perfil do paciente

📊 **Relatórios Estruturados**
- Análise detalhada de risco cardiovascular
- Recomendações preventivas acionáveis
- Download e impressão de relatórios

🔧 **Tecnologia Moderna**
- Frontend React com TypeScript
- Backend Node.js Express
- Integração com Google Gemini AI
- Interface responsiva e intuitiva

## Stack Tecnológico

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool
- **CSS3** - Modern styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Google Generative AI** - IA integration
- **CORS** - Cross-origin support

### IA
- **Google Gemini 2.0 Flash** - Large Language Model para análise

## Requisitos

- Node.js 18+
- npm ou yarn
- Google API Key (obtenha em https://aistudio.google.com/app/apikey)

## Configuração

### 1. Clonar o repositório

\`\`\`bash
git clone https://github.com/seu-usuario/cardiora.git
cd cardiora
\`\`\`

### 2. Instalar dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variáveis de ambiente

Crie um arquivo \`.env\` na raiz do projeto:

\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` e adicione sua Google API Key:

\`\`\`
GOOGLE_API_KEY=sua_chave_api_aqui
PORT=3001
NODE_ENV=development
\`\`\`

### 4. Configurar ambiente frontend

Crie um arquivo \`.env.development\` para o frontend:

\`\`\`
VITE_API_URL=http://localhost:3001
VITE_GEMINI_API_KEY=sua_chave_api_aqui
\`\`\`

## Uso

### Modo Desenvolvimento

Execute tanto o frontend quanto o backend:

\`\`\`bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run dev:server
\`\`\`

Ou execute ambos simultaneamente:

\`\`\`bash
npm run dev:all
\`\`\`

O frontend estará disponível em `http://localhost:5173`
O backend estará disponível em `http://localhost:3001`

### Build para Produção

\`\`\`bash
npm run build
\`\`\`

### Preview da build

\`\`\`bash
npm run preview
\`\`\`

## Uso da Aplicação

1. **Preencher Dados do Paciente**
   - Informe dados pessoais, histórico médico, estilo de vida e dados ambientais
   - Campos com * são obrigatórios

2. **Análise de Risco**
   - Clique em "Analisar Risco Cardiovascular"
   - A IA analisará os dados e identificará fatores de risco
   - Visualize os resultados da análise

3. **Recomendações Personalizadas**
   - Clique em "Obter Recomendações Personalizadas"
   - Receba sugestões de prevenção baseadas no perfil
   - Baixe ou imprima o relatório completo

## Estrutura do Projeto

\`\`\`
cardiora/
├── src/
│   ├── components/          # Componentes React
│   │   ├── PatientForm.tsx
│   │   ├── RiskAnalysis.tsx
│   │   └── RecommendationPanel.tsx
│   ├── services/            # Serviços de IA
│   │   └── geminiService.ts
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos principais
│   ├── index.css            # Estilos globais
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Tipos Vite
├── public/                  # Assets públicos
├── server.js                # Servidor Express
├── vite.config.ts           # Configuração Vite
├── tsconfig.json            # Configuração TypeScript
├── package.json             # Dependências npm
├── .env.example             # Exemplo de variáveis de ambiente
├── .env.development         # Variáveis de desenvolvimento
└── README.md                # Este arquivo
\`\`\`

## Tipos de Dados Processados

### Dados Pessoais
- Idade
- Sexo biológico

### Dados Genômicos
- Variantes genéticas de colesterol
- Polimorfismo APOE

### Histórico Médico
- Diagnóstico de hipertensão
- Diagnóstico de diabetes
- Histórico familiar de DCV
- Níveis de colesterol (LDL, HDL, triglicerídeos)
- Medicações em uso

### Estilo de Vida
- Tipo de alimentação
- Atividade física semanal
- Status de tabagismo
- Consumo de álcool
- Nível de estresse
- Horas de sono

### Dados Ambientais
- Cidade de residência
- Bairro
- Qualidade do ar
- Exposição a poluição sonora

## Aviso Importante ⚠️

As análises fornecidas por este sistema **não substituem o aconselhamento médico profissional**. Sempre consulte um médico qualificado ou cardiologista para:

- Diagnóstico definitivo
- Recomendações personalizadas baseadas no histórico completo
- Plano de tratamento individualizado
- Acompanhamento contínuo

## Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou PR com suas sugestões.

## Licença

Este projeto está sob licença MIT.

## Autores

Desenvolvido durante a Imersão Alura

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a saúde cardiovascular**

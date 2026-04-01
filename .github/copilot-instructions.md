<!-- GitHub Copilot Instructions for Cardiora AI -->

# Cardiora AI - Instruções para GitHub Copilot

## Visão Geral do Projeto

Cardiora AI é um sistema de análise preditiva para riscos cardiovasculares que utiliza inteligência artificial (Google Gemini) para:
- Coletar e processar dados heterogêneos de pacientes (genômicos, médicos, estilo de vida, ambientais)
- Analisar fatores de risco cardiovascular
- Gerar recomendações preventivas personalizadas
- Produzir relatórios estruturados

## Stack Técnico

### Frontend
- React 18 com TypeScript
- Vite como build tool
- CSS3 moderno
- Componentes funcionais com Hooks

### Backend
- Node.js com Express
- Google Generative AI SDK (Gemini)
- CORS para requisições cross-origin

## Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
├── services/           # Lógica de negócio e APIs
├── types/              # Tipos e interfaces TypeScript
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point
```

## Padrões de Código

### Componentes React

Use componentes funcionais com TypeScript:

```typescript
interface ComponentProps {
  prop1: string
  prop2: number
  onEvent?: () => void
}

export default function MyComponent({ prop1, prop2, onEvent }: ComponentProps) {
  const [state, setState] = useState<string>('')
  
  return <div>{prop1}</div>
}
```

### Tipos e Interfaces

- Use `interface` para objetos
- Use `type` para tipos primitivos ou uniões
- Sempre especifique tipos para state e props
- Evite `any` - use `unknown` se necessário

### Serviços de API

- Centralize chamadas de API em arquivos de `services/`
- Use `async/await` para operações assíncronas
- Trate erros apropriadamente

## Convenções de Nomenclatura

- **Componentes**: `PascalCase` (ex: `PatientForm.tsx`)
- **Variáveis/Funções**: `camelCase` (ex: `handleSubmit`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `MAX_AGE`)
- **Classes CSS**: `kebab-case` (ex: `.form-group`)

## Instruções Específicas para Copilot

### Ao Gerar Código

1. **Sempre inclua types**: Não gere code sem TypeScript types
2. **Siga o padrão do projeto**: Mantenha consistência com o código existente
3. **Use componentes existentes**: Reutilize componentes quando possível
4. **Adicione comentários**: Para lógica complexa
5. **Considere acessibilidade**: Use semântica HTML apropriada

### Ao Sugerir Refatorações

1. Mantenha a funcionalidade idêntica
2. Melhore performance e legibilidade
3. Reduza complexidade ciclomática
4. Remova código duplicado

### Ao Adicionar Funcionalidades

1. Atualize tipos em `src/types/index.ts` se necessário
2. Crie novos componentes em `src/components/`
3. Adicione serviços em `src/services/`
4. Inclua estilos CSS específicos do componente
5. Atualize documentação

## Erros Comuns a Evitar

- ❌ Não use `any` type
- ❌ Não misture lógica em componentes com lógica em serviços
- ❌ Não ignore erros de async/await
- ❌ Não modifique estado diretamente (use setState)
- ❌ Não crie dependências circulares

## Recursos do Projeto

- **Google Gemini API**: Para análise de IA
- **Patient Data Types**: Definidas em `src/types/index.ts`
- **Componentes Reutilizáveis**: PatientForm, RiskAnalysis, RecommendationPanel
- **Estilos Global**: Em `src/index.css` e `src/App.css`

## Para Desenvolvimento Local

```bash
npm install          # Instale dependências
npm run dev          # Inicie frontend
npm run dev:server   # Inicie backend (outro terminal)
npm run build        # Build de produção
npm run lint         # Verifique erros
```

## Pontos de Atenção

- O componente de formulário deve validar dados antes de enviar
- A análise de risco deve sempre incluir aviso sobre consulta médica
- Recomendações devem ser práticas e acionáveis
- Todos os dados sensíveis devem ser tratados com segurança
- A UI deve ser responsiva (mobile-first)

## Quando Pedir Ajuda ao Copilot

✅ Bom:
- "Crie um novo componente React para [descrição específica]"
- "Refatore esta função para melhorar performance"
- "Adicione type annotations a este código"
- "Como integrar nova feature ao workflow existente?"

❌ Evitar:
- Requisições muito vagas
- Pedir para gerar arquivos completos sem contexto
- Requisições que violem padrões do projeto

## Atualizações Futuras

Este arquivo deve ser atualizado quando:
- Padrões de código mudarem
- Novas funcionalidades forem adicionadas
- Estrutura do projeto mudar significantemente

---

**Última atualização**: Abril 2026
**Manutenedor**: Equipe Cardiora AI

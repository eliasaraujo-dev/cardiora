# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

O formato segue, de maneira adaptada, o padrão Keep a Changelog.

## [0.1.0] - 2026-04-01

### Added
- Estrutura completa do projeto Cardiora AI com frontend em React + TypeScript e backend em Express.
- Fluxo de análise de risco cardiovascular com coleta de dados heterogêneos do paciente.
- Painel de recomendações personalizadas e relatório pronto para impressão/download.
- Integração com Groq API (endpoint compatível com OpenAI) para geração de análises e recomendações.
- Fallback local para manter funcionalidade quando o provedor de IA estiver indisponível.
- Camadas de serviço tipadas no frontend (`httpClient` e `cardioApi`).
- Componente reutilizável para renderização de blocos de texto multilinha.
- Checklist de roadmap em 4 semanas para evolução de produto, segurança e qualidade.

### Changed
- Migração da integração de IA de Gemini para Groq.
- Refatoração da arquitetura frontend para reduzir acoplamento e centralizar chamadas HTTP.
- Refinamento visual da interface com foco em responsividade e legibilidade.
- Atualização do stack de build/lint para versões mais recentes e estáveis.

### Security
- Validação de payload com Zod no backend.
- Hardening com Helmet, CORS configurável por allowlist e rate limit.
- Limite de tamanho de payload JSON.
- Tratamento de erros com menor exposição de detalhes internos.
- Logging estruturado com identificação de requisições.

### Docs
- Reescrita do README com setup atualizado para Groq e aviso de uso educacional.
- Inclusão de licença MIT.
- Documentação adicional de setup, API, contribuição e sumário do projeto.

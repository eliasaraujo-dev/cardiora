# Cardiora AI - Checklist de Execucao (4 Semanas)

## Como usar
- Marque [x] quando concluir cada item.
- Use os criterios de aceite para validar qualidade.
- Priorize os blocos na ordem proposta.

## Status atual de release
- [x] Tag inicial publicada: v0.1.0 (2026-04-01).

## Semana 1 - Dados e Historico

### 1. Persistencia de analises
- [ ] Definir schema para paciente, analise e recomendacao.
- [ ] Salvar cada execucao com timestamp, modelVersion e promptVersion.
- [ ] Criar endpoint para listar historico por paciente.

Criterio de aceite:
- [ ] API salva e retorna historico completo por paciente sem regressao.

### 2. Timeline no frontend
- [ ] Criar tela/lista de analises anteriores.
- [ ] Adicionar filtro por data e nivel de risco.
- [ ] Permitir abrir uma analise antiga em modo leitura.

Criterio de aceite:
- [ ] Usuario consegue navegar no historico e revisar analises anteriores.

### 3. Migrations e seed
- [ ] Criar migration inicial.
- [ ] Criar seed com dados de exemplo.
- [ ] Documentar comando de setup local.

Criterio de aceite:
- [ ] Ambiente sobe do zero com um unico fluxo de setup.

## Semana 2 - Autenticacao e Controle de Acesso

### 4. Login e sessao segura
- [ ] Implementar login/logout.
- [ ] Usar cookie de sessao com httpOnly e sameSite adequado.
- [ ] Proteger endpoints de analise/historico.

Criterio de aceite:
- [ ] Endpoint protegido responde 401 sem sessao valida.

### 5. RBAC minimo
- [ ] Criar papeis: admin e profissional.
- [ ] Restringir endpoint interno de auditoria para admin.
- [ ] Validar autorizacao por middleware.

Criterio de aceite:
- [ ] Usuario sem papel admin nao acessa rotas administrativas.

### 6. Seguranca de sessao e segredos
- [ ] Ativar protecao CSRF (se usar cookies de sessao).
- [ ] Rotacionar e versionar chaves por ambiente.
- [ ] Revisar politica de logs sem dados sensiveis.

Criterio de aceite:
- [ ] Nenhum segredo exposto no frontend/logs.

## Semana 3 - Produto e Experiencia Clinica

### 7. Relatorio PDF
- [ ] Gerar PDF com resumo de risco e recomendacoes.
- [ ] Incluir metadados (data, versao do modelo, disclaimer).
- [ ] Garantir legibilidade para impressao.

Criterio de aceite:
- [ ] PDF exporta corretamente e fica consistente em desktop/mobile.

### 8. Explicabilidade do risco
- [ ] Exibir fatores com maior impacto no score.
- [ ] Mostrar classificacao de risco com justificativa.
- [ ] Indicar limitacoes da analise automatizada.

Criterio de aceite:
- [ ] Usuario entende por que recebeu aquele nivel de risco.

### 9. Simulador E se
- [ ] Permitir ajuste de 2 a 3 variaveis (atividade, LDL, tabagismo).
- [ ] Recalcular score em tempo real.
- [ ] Exibir comparativo antes/depois.

Criterio de aceite:
- [ ] Simulacao mostra impacto claro das mudancas de habito.

### 10. Plano 30/60/90 dias
- [ ] Converter recomendacoes em checklist acionavel.
- [ ] Permitir marcar progresso.
- [ ] Salvar plano no historico do paciente.

Criterio de aceite:
- [ ] Usuario acompanha progresso por periodo.

## Semana 4 - Qualidade, Observabilidade e Release

### 11. Testes automatizados
- [ ] Unit tests para validadores e servicos.
- [ ] Integracao para rotas principais.
- [ ] E2E do fluxo: formulario -> analise -> recomendacao.

Criterio de aceite:
- [ ] Pipeline bloqueia merge em caso de falha.

### 12. Observabilidade
- [ ] Medir latencia por endpoint.
- [ ] Medir taxa de erro e fallback.
- [ ] Criar alertas para picos de erro.

Criterio de aceite:
- [ ] Dashboard basico com metricas essenciais disponivel.

### 13. CI/CD
- [ ] Pipeline com lint, test, build, audit.
- [ ] Executar checks em pull requests.
- [ ] Publicar artefato de build com rastreabilidade.

Criterio de aceite:
- [ ] Nenhum merge sem quality gate aprovado.

### 14. Hardening final de release
- [ ] Revisar OWASP Top 10 aplicado ao projeto.
- [ ] Revisar CORS, headers e rate-limit por ambiente.
- [ ] Finalizar documentacao de operacao e seguranca.

Criterio de aceite:
- [ ] Checklist de release assinado e sem bloqueios criticos.

## Backlog Tecnico (Opcional)
- [ ] Migrar trilha de auditoria de memoria para persistencia.
- [ ] Implementar feature flags para fallback e modos de IA.
- [ ] Adicionar benchmark de performance por versao.

## Definicao de pronto do ciclo
- [ ] Historico completo e navegavel.
- [ ] Endpoints protegidos com autenticacao/autorizacao.
- [ ] Relatorio PDF e explicabilidade entregues.
- [ ] CI/CD com gates de seguranca e qualidade.
- [ ] Sem vulnerabilidades moderadas/altas em dependencias de producao.

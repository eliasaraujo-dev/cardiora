# Guia de Configuração - Cardiora AI

Este guia fornece instruções detalhadas para configurar e executar o Cardiora AI localmente.

## Pré-requisitos

- **Node.js**: v18.0.0 ou superior
- **npm**: v9.0.0 ou superior (incluído com Node.js)
- **Git**: para controle de versão

### Verificar Versões

```bash
node --version  # Deve ser v18.0.0 ou superior
npm --version   # Deve ser v9.0.0 ou superior
```

## Obter a Chave API do Google Gemini

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em "Create API Key" (Criar Chave de API)
3. Copie a chave gerada
4. **Guarde em local seguro** - Esta chave não deve ser compartilhada

## Instalação Passo-a-Passo

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/cardiora.git
cd cardiora
```

### 2. Instalar Dependências

```bash
npm install
```

Isso instalará todas as dependências listadas em `package.json`, incluindo:
- React e React DOM
- Express e CORS para o backend
- Google Generative AI SDK
- Vite como build tool
- TypeScript e ferramentas de desenvolvimento

### 3. Configurar Variáveis de Ambiente

#### Backend

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e substitua `your_google_api_key_here` pela sua chave:

```env
GOOGLE_API_KEY=AIza...sua_chave_aqui
PORT=3001
NODE_ENV=development
```

#### Frontend

Edite o arquivo `.env.development`:

```env
VITE_API_URL=http://localhost:3001
VITE_GEMINI_API_KEY=AIza...sua_chave_aqui
```

**Nota**: As variáveis de ambiente VITE_ são injetadas durante a build. Se modificar `.env.development`, reinicie o servidor de desenvolvimento.

## Execução

### Opção 1: Ambos em Terminais Separados (Recomendado)

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Acesse em: http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run dev:server
```
O servidor será executado em: http://localhost:3001

Saúde do servidor: http://localhost:3001/health

### Opção 2: Ambos em Paralelo

```bash
npm run dev:all
```

Este comando usa `concurrently` para executar tanto o frontend quanto o backend no mesmo terminal.

### Opção 3: Apenas Frontend

Se você já tem o backend executando:

```bash
npm run dev
```

## Build para Produção

### Compilar e Agrupar

```bash
npm run build
```

Isso criará:
- Arquivos TypeScript compilados
- Bundle otimizado em `dist/`
- CSS minificado
- JavaScript bundled

### Visualizar Build Localmente

```bash
npm run preview
```

Acesse a build em: http://localhost:4173

## Troubleshooting

### Erro: "Falha ao conectar ao backend"

1. Verifique se o servidor backend está executando
2. Verifique se `VITE_API_URL` está correto em `.env.development`
3. Verifique os logs do navegador (F12) para mais detalhes

### Erro: "API Key não configurada"

1. Verifique se `GOOGLE_API_KEY` está em `.env`
2. Verifique se `VITE_GEMINI_API_KEY` está em `.env.development`
3. Certifique-se de que as chaves são válidas

### Erro: Compilação TypeScript

```bash
npm run build
```

Isso mostrará qualquer erro de tipo. Corrija os erros indicados.

### Porta Já em Uso

Se a porta 5173 (frontend) ou 3001 (backend) já está em uso:

**Para mudar a porta do frontend:**
Edite `vite.config.ts`:
```typescript
server: {
  port: 5174,  // Mudar para outra porta
}
```

**Para mudar a porta do backend:**
Edite ou adicione em `.env`:
```env
PORT=3002  # Mudar para outra porta
```

## Estrutura de Desenvolvimento

```
cardiora/
├── src/
│   ├── components/              # Componentes React reutilizáveis
│   │   ├── PatientForm.tsx      # Formulário de entrada de dados
│   │   ├── RiskAnalysis.tsx     # Exibição de análise
│   │   └── RecommendationPanel.tsx # Recomendações
│   ├── services/
│   │   └── geminiService.ts     # Integração com IA (frontend)
│   ├── types/
│   │   └── index.ts             # Tipos e interfaces TypeScript
│   ├── App.tsx                  # Componente raiz
│   ├── main.tsx                 # Entry point React
│   └── vite-env.d.ts            # Tipos Vite
├── src/services.js              # Integração com IA (backend)
├── server.js                    # Servidor Express
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── .env.example                # Exemplo de variáveis
├── .eslintrc.json              # Configuração ESLint
└── README.md                   # Documentação principal
```

## Fluxo de Desenvolvimento

1. **Editar arquivos** em `src/`
2. **Salvar arquivo** - Vite recarrega automaticamente (`HMR`)
3. **Verificar no navegador** - Mudanças aparecem em tempo real
4. **Testar backend** - Faça requisições para `http://localhost:3001`

## Scripts npm

```bash
npm run dev              # Inicia frontend em desenvolvimento
npm run dev:server      # Inicia backend em desenvolvimento
npm run dev:all         # Inicia ambos em paralelo
npm run build           # Compila para produção
npm run preview         # Visualiza build de produção
npm run lint            # Verifica código com ESLint
```

## Próximos Passos

1. ✅ Configurar variáveis de ambiente
2. ✅ Instalar dependências
3. ✅ Executar projeto localmente
4. 📝 Explore componentes em `src/components/`
5. 🔧 Customize conforme necessário
6. 📦 Deploy para produção quando pronto

## Recursos Adicionais

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Express](https://expressjs.com)
- [Google Generative AI SDK](https://ai.google.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Suporte

Para dúvidas ou problemas:
1. Verifique este guia
2. Verifique o README.md
3. Abra uma issue no repositório
4. Consulte a documentação das bibliotecas

---

**Sucesso! Você está pronto para começar a desenvolver Cardiora AI** 🚀

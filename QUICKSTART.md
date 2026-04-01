# 🚀 Quick Start Guide - Cardiora AI

## 5 Minutos para Começar

### 1. Configurar API Key (1 min)

```bash
# Abra .env e adicione sua Google API Key
# Obtenha em: https://aistudio.google.com/app/apikey

GOOGLE_API_KEY=AIza...sua_chave_aqui
PORT=3001
NODE_ENV=development
```

### 2. Terminal 1: Frontend (1 min)

```bash
cd c:\dev\personal\cardiora
npm run dev
```

✅ Frontend será aberto em: http://localhost:5173

### 3. Terminal 2: Backend (1 min)

```bash
cd c:\dev\personal\cardiora
npm run dev:server
```

✅ Backend rodando em: http://localhost:3001

### 4. Testar Aplicação (2 min)

1. Abra http://localhost:5173
2. Preencha o formulário com dados fictícios
3. Clique em "Analisar Risco Cardiovascular"
4. Visualize a análise
5. Clique em "Obter Recomendações Personalizadas"
6. Obtenha recomendações personalizadas

---

## 🎯 Estrutura de Pastas (Referência Rápida)

```
cardiora/
├── src/components/              # React Components
├── src/types/                   # TypeScript Types
├── src/services/                # IA Services
├── server.js                    # Express Backend
├── .env                         # Variáveis de Ambiente
├── vite.config.ts              # Vite Config
└── package.json                # Dependencies
```

---

## 💻 Comandos Principais

```bash
# Frontend apenas
npm run dev

# Backend apenas
npm run dev:server

# Ambos ao mesmo tempo
npm run dev:all

# Build produçãoo
npm run build

# Verificar erros
npm run lint
```

---

## 🔑 Obter Chave Google Gemini

1. Acesse: https://aistudio.google.com/app/apikey
2. Clique em "Create API Key"
3. Copie a chave
4. Cole em `.env` como `GOOGLE_API_KEY`

---

## ❌ Solução Rápida de Problemas

### "API Key não configurada"
→ Verifique `.env` e `.env.development`

### "Conexão recusada"
→ Verifique se ambos os servidores estão rodando

### "Porta já em uso"
→ Mude a porta em `vite.config.ts` e `.env`

### "Erro de compilação"
→ Execute `npm run build` para ver detalhes

---

## 📊 Dados de Exemplo

```json
{
  "idade": 50,
  "sexo_biologico": "Masculino",
  "ldl_colesterol": 150,
  "hdl_colesterol": 45,
  "triglicerideos": 180,
  "hipertensao": "Sim",
  "atividade_fisica": 60,
  "tabagismo": "Ex-Fumante"
}
```

---

## 📚 Documentação Completa

- **README.md** - Visão geral do projeto
- **SETUP.md** - Instalação detalhada
- **API.md** - Endpoints da API
- **CONTRIBUTING.md** - Guia para contribuidores
- **PROJECT_SUMMARY.md** - Resumo completo

---

## 🎉 Pronto!

Você agora tem o Cardiora AI funcionando localmente com:
- ✅ Frontend React com TypeScript
- ✅ Backend Express com IA integrada
- ✅ Google Gemini integration
- ✅ Análise de risco cardiovascular
- ✅ Recomendações personalizadas
- ✅ Interface completa e responsiva

**Divirta-se desenvolvendo!** 🚀

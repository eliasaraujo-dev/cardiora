# Contribuindo para Cardiora AI

Agradecemos por considerar contribuir para Cardiora AI! Este documento fornece orientações e instruções para contribuir ao projeto.

## Código de Conduta

Este projeto adota um Código de Conduta. Esperamos que todos os contribuidores o sigam. Por favor, leia nosso Código de Conduta para entender quais comportamentos serão e não serão tolerados.

## Como Contribuir

### Relatar Bugs

Antes de criar um relatório de bug, verifique a lista de issues, pois você pode descobrir que o bug já foi relatado. Quando você está criando um relatório de bug, inclua o máximo de detalhes possível:

- **Use um título descritivo** para a issue
- **Descreva os passos exatos** que reproduzem o problema
- **Forneça exemplos específicos** para demonstrar os passos
- **Descreva o comportamento observado** e indique qual é o problema
- **Explique qual é o comportamento esperado** e por quê
- **Inclua screenshots ou GIFs animados** se possível
- **Mencione sua versão do Node.js e SO**

### Sugerir Melhorias

As sugestões de melhorias são sempre bem-vindas! As melhorias podem ser pequenas (correções de tipo) ou grandes (novas funcionalidades). Para criar uma sugestão de melhoria:

- **Use um título descritivo** para a issue
- **Forneça uma descrição detalhada** da melhoria sugerida
- **Liste alguns exemplos** de como a melhoria seria usada
- **Mencione outras aplicações** que implementam essa funcionalidade

### Pull Requests

- Preencha o template fornecido
- Siga os estilos de código TypeScript/React do projeto
- Inclua screenshots/GIFs animados em suas PRs quando relevante
- Documente seu comportamento em commits claros
- Termine todos os arquivos com uma quebra de linha

## Processo de Desenvolvimento

### Setup Local

```bash
# 1. Fork o repositório
# 2. Clone seu fork
git clone https://github.com/seu-usuario/cardiora.git
cd cardiora

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com sua Google API Key

# 4. Instale as dependências
npm install
```

### Fazer Alterações

```bash
# 1. Crie uma branch para seu recurso
git checkout -b feature/sua-feature

# 2. Faça suas alterações
# 3. Teste suas mudanças
npm run dev
npm run dev:server

# 4. Verifique o linting
npm run lint

# 5. Commit suas mudanças
git commit -m "feat: adiciona nova feature"

# 6. Push para seu fork
git push origin feature/sua-feature

# 7. Abra um Pull Request no repositório principal
```

### Guia de Estilo

#### TypeScript/React

- Use convenção de nomenclatura `camelCase` para variáveis e funções
- Use `PascalCase` para componentes e tipos
- Use tipos explícitos sempre que possível
- Use `const` e `let`, evite `var`
- Use destructuring quando apropriado
- Use arrow functions para callbacks

```typescript
// ✅ Bom
const MyComponent: React.FC<Props> = ({ name, onSubmit }) => {
  const [state, setState] = useState<string>('')
  
  const handleClick = () => {
    setState('novo valor')
  }
  
  return <div onClick={handleClick}>{name}</div>
}

// ❌ Ruim
const mycomponent = (props: any) => {
  var state = ''
  
  function handleClick() {
    state = 'novo valor'
  }
  
  return <div onClick={handleClick}>{props.name}</div>
}
```

#### CSS/Componentes

- Cada componente tem um arquivo `.tsx` and um arquivo `.css`
- Use BEM (Block Element Modifier) para nomenclatura de classes
- Use variáveis CSS quando possível
- Mantenha especificidade baixa

```css
/* ✅ Bom */
.card {
  padding: 1rem;
}

.card__title {
  font-size: 1.5rem;
  font-weight: 600;
}

.card__title--highlight {
  color: #00d4ff;
}

/* ❌ Ruim */
.card {
  padding: 1rem;
}

.card .title {
  font-size: 1.5rem;
  font-weight: 600;
}

.card .title.highlight {
  color: #00d4ff;
}
```

### Convenção de Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto-e-vírgula ausente, etc
- `refactor`: Refatoração de código sem mudança de funcionalidade
- `perf`: Melhorias de performance
- `test`: Adicionar ou atualizar testes
- `chore`: Atualizações de build, dependências, etc

**Exemplos:**
```
feat(form): adiciona validação em tempo real ao formulário de paciente

fix(api): corrige erro de conexão com Gemini API

docs: atualiza instruções de instalação

refactor(components): simplifica lógica do componente RiskAnalysis
```

## Testes

Antes de enviar um PR, por favor:

1. Verifique se o código compila sem erros:
   ```bash
   npm run build
   ```

2. Verifique o linting:
   ```bash
   npm run lint
   ```

3. Teste manualmente a funcionalidade afetada

## Revisão de Pull Request

Um ou mais mantenedores irão revisar seu PR. Podemos sugerir mudanças, melhorias ou alternativas. Mudanças no PR são esperadas! As alterações sugeridas não significam que seu código é ruim - apenas que, ao trabalhar juntos, podemos melhorar ainda mais o projeto.

## Dúvidas?

Sinta-se livre para abrir uma discussão ou entrar em contato com os mantenedores!

---

**Obrigado por contribuir para Cardiora AI!** 🎉

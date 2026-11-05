# ⚡ TypeScripting

> **High-octane Cyberpunk / JARVIS Code Speed Typing Game**  
> Inspirado no *Monkeytype*, projetado especificamente para desenvolvedores treinarem memória muscular e velocidade em trechos de código reais.

---

## 🌌 Visão Geral & Arquitetura

O **TypeScripting** foi construído com as melhores práticas de front-end moderno:
- **Vue 3 (Composition API)**: Reatividade cirúrgica, separação limpa com composables (`useTypingGame`), tipagem estrita com TypeScript.
- **Vite 6**: Bundler ultrarrápido com Hot Module Replacement (HMR) instantâneo.
- **Tailwind CSS**: Tema **Cyberpunk/JARVIS** com fundo escuro sólido (`bg-gray-950`), fontes estritamente monoespaçadas (*JetBrains Mono* / *Fira Code*), e realces em verde neon (`#00ff88`) e azul ciano (`#00f0ff`).
- **Web Audio API**: Feedback sonoro mecânico sintético sem dependência de arquivos externos de áudio pesados.
- **Global Key Listeners**: Captura global de eventos de teclado (`window.addEventListener('keydown')`) sem a necessidade de manter o foco em um `<input>` tradicional.

---

## 🎯 Principais Funcionalidades

- 🧠 **Trechos de Códigos Reais**:
  - **Java**: Main methods, Streams API (`.filter()`, `.map()`), Singleton patterns, Records.
  - **Python**: Tipagens estritas (`calculate_shipping`), Decorators assíncronos (`@functools.wraps`), Asyncio gather, Dict comprehensions.
  - **SQL**: Queries analíticas com Window Functions (`DENSE_RANK`), CTEs recursivas.
  - **TypeScript**: Monads discriminados de erro (`Result<T>`), Utilitários recursivos de tipo (`DeepReadonly<T>`).
  - **Rust**: Concorrência com channels e Pattern Matching (`recv_timeout`).
- ⚡ **Mecânica de Digitação**:
  - Caractere correto: **Verde Neon** com glow sutil.
  - Caractere incorreto: **Vermelho Neon** com feedback de erro imediato.
  - Suporte completo a `Backspace` para correção de erros.
  - Quebras de linha e indentação inteligente de blocos de código.
  - Cursor Caret animado e reativo na posição exata de digitação.
- ⏱️ **Cronômetro e Telemetria em Tempo Real**:
  - Modos de tempo de **15s**, **30s** e **60s**.
  - **WPM (Words Per Minute)**: Cálculo padrão da indústria baseado em caracteres líquidos por minuto.
  - **Precisão (%)**: Taxa de acerto instantânea com contagem de falhas.
  - **Modal de Resultados**: Resumo executivo com confetes e telemetria detalhada ao término.
- 🔊 **Feedback Sensorial Cyberpunk**:
  - Cliques mecânicos e bips de sintetizador via Web Audio API.

---

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
| :--- | :--- |
| **Qualquer tecla alfanumérica** | Inicia a sessão de digitação imediatamente |
| `Tab` | Alterna / Gera um novo trecho de código |
| `Esc` | Reinicia a contagem e o teste atual |
| `Backspace` | Apaga o último caractere digitado para correção |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18+ ou 20+ recomendada)
- **npm** (ou yarn / pnpm)

### Instalação

Clone o repositório ou navegue até a pasta do projeto:

```bash
cd TypeScripting
```

Instale as dependências:

```bash
npm install
```

> **Dica Windows PowerShell**: Caso encontre restrição de execução de script (`PSSecurityException`), execute com `npm.cmd install` ou altere a ExecutionPolicy para `RemoteSigned`.

### Execução em Modo de Desenvolvimento

Inicie o servidor local do Vite:

```bash
npm run dev
```

Abra no navegador o endereço exibido no terminal (geralmente `http://localhost:5173/`).

### Build de Produção

Para validar a tipagem TypeScript e gerar a pasta otimizada `dist/`:

```bash
npm run build
```

Para pré-visualizar a build de produção:

```bash
npm run preview
```

---

## 📁 Estrutura de Diretórios

```text
TypeScripting/
├── public/                 # Favicons e assets estáticos
├── src/
│   ├── components/         # Componentes modulares Vue
│   │   ├── CyberHeader.vue # Barra de navegação e seletores de modo
│   │   ├── StatsBar.vue    # HUD com métricas em tempo real (WPM, %, Timer)
│   │   ├── CodeDisplay.vue # Terminal interativo com realce de sintaxe e caret
│   │   ├── StatsModal.vue  # Modal pós-partida com telemetria
│   │   └── CyberFooter.vue # Rodapé estético
│   ├── composables/
│   │   └── useTypingGame.ts# Máquina de estados da digitação e telemetria
│   ├── data/
│   │   └── snippets.ts     # Banco de trechos reais em Java, Python, SQL, TS, etc.
│   ├── types/
│   │   └── game.ts         # Contratos e tipos TypeScript
│   ├── App.vue             # Shell principal da aplicação
│   ├── main.ts             # Entrypoint Vue
│   └── style.css           # Tailwind e diretivas cyberpunk
├── index.html              # HTML com fontes JetBrains Mono e Fira Code
├── package.json
├── tailwind.config.js      # Paleta Cyberpunk (Neon Green, Cyan, Dark 950)
├── tsconfig.json
└── vite.config.ts
```

---

*Feito com ⚡ para entusiastas de código rápido e interfaces de alta performance.*

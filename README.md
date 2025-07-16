
# 🎮 Free-to-Play Game Recommender

⚠️Como um diferencial eu fiz o deploy completo da aplicação na Vercel, então caso você queira já testar diretamente no navegador sem passar pelos passos de rodar localmente basta acessar [este link](https://processo-seletivo-level-up.vercel.app/).

Projeto completo com frontend em React e backend proxy em Node.js (por conta da API oficial que não permite chamadas diretas com o front, dando o erro de CORS) que recomenda jogos gratuitos com base nas preferências do usuário utilizando a [FreeToGame API](https://www.freetogame.com/api-doc).

---

## 📁 Estrutura do Projeto

```bash
📦 levelup-games-recommendation/
├── frontend/             # Aplicação React
│   ├── public/
│   |── src/
│   |    ├── components/
│   |    │   ├── FilterForm.jsx
│   |    │   └── GameCard.jsx
│   |    ├── services/
│   |    │   └── api.js
│   |    ├── App.css
│   |    ├── App.jsx
│   |    └── index.js
|   ├── .env.example
|   ├── package-lock.json
|   └── package.json
├── backend/              # Proxy por conta da API que dá erro de CORS
|   ├── .env.example
|   ├── package-lock.json
|   ├── package.json
│   └── proxy-server.js
├── .gitignore
└── README.md
```

---

## 🔧 Tecnologias Utilizadas

### Frontend:
- React
- Axios
- CSS3 (tema escuro customizado)
- Layout responsivo (com UI distinta para desktop e mobile)
- Select de gêneros com múltiplos checkboxes adaptado por dispositivo

### Backend:
- Node.js
- Express
- Axios
- CORS middleware

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:dihreyaraujo/Processo-Seletivo-Level-Up.git
cd levelup-games-recommendation
```

### 2. Instale e rode o backend (proxy)

```bash
cd proxy-backend
npm install
npm start
```

O servidor estará disponível em: `http://localhost:4000` ou na porta que você definir no .env (deixei um .env.example para que você possa excluir o .example e ter o arquivo para manipulação)

### 3. Instale e rode o frontend

```bash
cd ../frontend
npm install
npm start
```

O site abrirá automaticamente em `http://localhost:3000` com o adendo também ao .env.example da pasta, podendo alterar a url de chamada do backend (por padrão será o localhost na porta 4000)

---

## 🎯 Funcionalidades

- Filtros por gêneros, plataforma e RAM mínima
- UI adaptada para mobile e desktop
- Consumo de API com validação inteligente de requisitos mínimos
- Proxy backend para contornar CORS
- Layout moderno, bonito e funcional

---

## 📌 Observações Técnicas

- A API oficial não permite chamadas diretas do frontend devido ao CORS, por isso usei um servidor proxy local com Node.js.
- A filtragem por RAM exige requisições individuais para cada jogo (`/game?id=...`), respeitando o limite de 10 requisições por segundo.
- No mobile, o select de gêneros vira um overlay de tela cheia com botão fixo de fechamento, melhorando a UX.

---

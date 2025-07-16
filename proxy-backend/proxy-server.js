const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
const BASE_URL = 'https://www.freetogame.com/api';

app.get('/games', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, { params: req.query });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

app.get('/game', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/game`, { params: req.query });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar jogo por ID' });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});

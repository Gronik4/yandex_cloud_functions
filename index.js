const express = require('express');
const serverless = require('serverless-http');
const { characters } = require('./characters');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/characters', (req, res) => {
  res.json(characters)
});

app.get('/api/character/:id', (req, res) => {
  const { id } = req.params;
  const idx = characters.findIndex(el=> el.id === id);
  if (idx != -1) {
  res.json({mess: `Персонаж найден`, char: characters[idx]});
  }
  res.json({err: 'Персонаж не найден.'});
});

module.exports.handler = serverless(app);
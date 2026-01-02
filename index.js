const express = require('express');
import serverless from 'serverless-http';
const { characters } = require('./characters');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/character', (req, res) => {
  res.json(characters)
});

app.get('/api/character/:id', (req, res) => {
  const { id } = req.params;
  const idx = characters.findIndex(el=> el.id === id);
  res.json(characters[idx]);
});

//app.listen(process.env.PORT || 3000, () => {console.log('Север запущен на порту 3000.');})// ТОлько для проверки локально - удалить
module.exports.hendler = serverless(app);
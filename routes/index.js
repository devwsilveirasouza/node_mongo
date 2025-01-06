var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
// Rota para buscar todos os clientes
router.get('/', async(req, res, next) => {
  const result = await db.find();
  res.render('index', { title: 'Express', result: result });
});
// Rota para salvar um novo cliente
router.post('/save', async (req, res) => {
    const customer = req.body;
    const result = await db.insert(customer);
    console.log(result);
    res.json(result);
})
// Rota para deletar um cliente
router.post('/delete', async (req, res) => {
  try {
      const id = req.body.id;
      if (!id) throw new Error('ID não fornecido');
      const result = await db.remove(id);
      console.log(result);
      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar cliente');
  }
});

// Rota para atualizar um cliente
router.post('/edit', async (req, res) => {
  try {
      const id = req.body.id;
      const name = req.body.name;
      if (!id) throw new Error('ID não fornecido');
      const result = await db.update(id, name);
      console.log(result);
      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar cliente');
  }
});

module.exports = router;

// src/routes/customer.routes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.index);
router.get('/add', CustomerController.createPage);
router.post('/add', CustomerController.create);
router.get('/edit/:id', CustomerController.editPage); // Página de edição
router.post('/edit', CustomerController.update); // Atualizar cliente
router.delete('/delete/:id', CustomerController.delete); // Excluir cliente

module.exports = router;

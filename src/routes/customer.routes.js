// src/routes/customer.routes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.index);
router.post('/save', CustomerController.create);
router.post('/delete', CustomerController.delete);
router.post('/edit', CustomerController.update);

module.exports = router;

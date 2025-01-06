// src/controllers/CustomerController.js
const CustomerService = require('../services/CustomerService');

class CustomerController {
    static async index(req, res) {
        const customers = await CustomerService.getAllCustomers();
        res.render('index', { title: 'Express', result: customers });
    }

    static async create(req, res) {
        try {
            const result = await CustomerService.createCustomer(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).send('Erro ao criar cliente');
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.body;
            if (!id) throw new Error('ID não fornecido');
            
            const result = await CustomerService.deleteCustomer(id);
            res.json(result);
        } catch (error) {
            res.status(500).send('Erro ao deletar cliente');
        }
    }

    static async update(req, res) {
        try {
            const { id, name } = req.body;
            if (!id) throw new Error('ID não fornecido');
            
            const result = await CustomerService.updateCustomer(id, name);
            res.json(result);
        } catch (error) {
            res.status(500).send('Erro ao atualizar cliente');
        }
    }
}

module.exports = CustomerController;
// src/controllers/CustomerController.js
const { ObjectId } = require("mongodb");
const CustomerService = require("../services/CustomerService");

class CustomerController {
  static async index(req, res) {
    const customers = await CustomerService.getAllCustomers();
    res.render("index", { title: "Express", result: customers });
  }

  static async create(req, res) {
    try {
      const result = await CustomerService.createCustomer(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).send("Erro ao criar cliente");
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;
      if (!id) throw new Error("ID não fornecido");

      const result = await CustomerService.deleteCustomer(id);
      res.json(result);
    } catch (error) {
      res.status(500).send("Erro ao deletar cliente");
    }
  }

  static async editPage(req, res) {
    const { id } = req.params;
    const customer = await CustomerService.findCustomerById(id);
    res.render("edit", { customer });
  }

  // Atualiza cliente
  static async update(req, res) {
    console.log('Dados recebidos:', req.body);

    try {
      const { id, name, age } = req.body;
        console.log('Dados recebidos:', req.body);

      if (!ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido");
      }

      await CustomerService.updateCustomer(id, { name, age });
      res.redirect("/");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      res.status(500).send("Erro ao atualizar cliente");
    }
  }
}

module.exports = CustomerController;

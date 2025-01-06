// src/controllers/CustomerController.js
const { ObjectId } = require("mongodb");
const CustomerService = require("../services/CustomerService");

class CustomerController {
  static async index(req, res) {
    const customers = await CustomerService.getAllCustomers();
    res.render("index", { title: "Express", result: customers });
  }

  static async createPage(req, res) {
    res.render("create", { title: "Adicionar Cliente" });
  }

  static async create(req, res) {
    try {
      const result = await CustomerService.createCustomer(req.body);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Erro ao criar cliente");
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

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido ou não fornecido" });
      }
  
      const result = await CustomerService.deleteCustomer(id);
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
  
      return res.json({ success: true, message: "Cliente removido com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      return res.status(500).json({ error: "Erro ao deletar cliente" });
    }
  }
}

module.exports = CustomerController;

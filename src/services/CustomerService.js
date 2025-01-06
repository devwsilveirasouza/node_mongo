// src/services/CustomerService.js
const Customer = require('../models/Customer');

class CustomerService {
    static async getAllCustomers() {
        return Customer.findAll();
    }

    static async createCustomer(customerData) {
        return Customer.create(customerData);
    }

    static async deleteCustomer(id) {
        return Customer.delete(id);
    }

    static async updateCustomer(id, name) {
        return Customer.update(id, name);
    }
}

module.exports = CustomerService;
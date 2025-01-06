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

    static async updateCustomer(id, name, age) {
        return Customer.update(id, name, age);
    }

    static async findCustomerById(id) {
        return Customer.findById(id);
    }
    
}

module.exports = CustomerService;
// src/models/Customer.js
const { ObjectId } = require('mongodb');
const db = require('../config/database');

class Customer {
    static async create(customer) {
        const database = await db.connect();
        return database.collection('customers').insertOne(customer);
    }

    static async findAll() {
        const database = await db.connect();
        return database.collection('customers').find().toArray();
    }

    static async delete(id) {
        const database = await db.connect();
        return database.collection('customers').deleteOne({ _id: new ObjectId(id) });
    }

    static async update(id, name) {
        const database = await db.connect();
        return database.collection('customers').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name } }
        );
    }
}

module.exports = Customer;
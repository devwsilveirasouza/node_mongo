// src/config/database.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

let singleton;

async function connect() {
    if (singleton) return singleton;
    
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

module.exports = {
    connect
};
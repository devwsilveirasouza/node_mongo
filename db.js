require ('dotenv').config();
const { MongoClient } = require('mongodb');
// Singleton para armazenar a conexão com o banco de dados
// Evita que seja criada uma nova conexão a cada chamada
// A conexão fica armazenada no singleton 
// e reutilizada em toda a aplicação
let singleton;

async function connect(){
    // Verifica se o singleton ja foi criado
    // Se sim, retorna o singleton    
    if(singleton){
        return singleton;
    }
    // Realiza a conexão com o banco de dados
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    // Armazena a conexão no singleton
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function insert(customer){
    const db = await connect();
    return db.collection('customers').insertOne(customer);
}

module.exports = {
    insert
};
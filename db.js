require ('dotenv').config();
// Importa o pacote mongodb para realizar a conexão
// E ObjectId para trabalhar com o ObjectId    
const { MongoClient, ObjectId } = require('mongodb');
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
// Função para inserir um novo cliente
async function insert(customer){
    const db = await connect();
    return db.collection('customers').insertOne(customer);
}

// Função para buscar todos os clientes
async function find(){
    const db = await connect();
    return db.collection('customers').find().toArray();
}

// Função para deletar um cliente
async function remove(id){
    const db = await connect();
    return db.collection('customers').deleteOne({ _id: new ObjectId(id) });
}

// Função para atualizar um cliente
async function update(id, name){
    const db = await connect();
    return db.collection('customers').updateOne({ _id: new ObjectId(id) }, { $set: { name } });
}

// Exporta as funções
module.exports = {
    insert,
    find,
    remove,
    update
};
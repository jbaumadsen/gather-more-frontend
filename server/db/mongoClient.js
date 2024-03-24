const { MongoClient } = require('mongodb');
const uri = require('../config/config').mongoUri;

const client = new MongoClient(uri);

const connectToMongo = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (err) {
        console.error('Connection error:', err);
    }
};

module.exports = { connectToMongo, client };
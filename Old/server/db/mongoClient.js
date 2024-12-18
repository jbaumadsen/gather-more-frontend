require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'mtg-fun'; // Name of your database

const connectToMongo = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName); // Get the database
    } catch (err) {
        console.error('Connection error:', err);
    } 
};

connectToMongo();

module.exports = { connectToMongo, client };
const express = require('express');
const path = require('path');
const mtg = require('mtgsdk');
const { MongoClient } = require('mongodb');

const app = express();
const uri = "mongodb+srv://evomrixse:smalltagbrim@cluster0.o70riap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  const collection = client.db("test").collection("devices");
  client.close();
});

app.get('/set', (req, res) => {
    console.log('set hit')
    const { setName } = req.query;
    mtg.card.all({ setName: 'ravnica', pageSize: 1 })
        .on('data', card => {
            console.log("anycards?")
            console.log(card)
        })
});

app.get('/set2', (req, res) => {
    console.log('set hit');
    const { setName, page } = req.query;
    mtg.card.where({ setName: setName, pageSize: 100, page: page })
        .then(cards => {
            console.log("anycards?");
            const strippedCards = cards.map(card => {
                const { foreignNames, ...rest } = card;
                return rest;
            });
            res.json(strippedCards);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
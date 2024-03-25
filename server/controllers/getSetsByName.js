const { client } = require('../db/mongoClient');
const mtg = require('mtgsdk');
// const getCardsBySetName = require('./getCardsBySetName');
const { getCardsBySetName } = require('./getCardsBySetName');


const getSetByName = async (req, res) => {
    const setName = req.query.setName;

    if (!setName) {
        return res.status(400).send({ error: 'setName query parameter is required' });
    }

    try {
        const db = client.db('mtg-fun');
        console.log('setName is : ' + setName);
        let set = await db.collection('sets').findOne({ name: setName });

        if (!set) {
            console.log(`Set ${setName} not found in database. Fetching from MTG SDK...`);
            const sets = await mtg.set.where({ name: setName });
            // console.log(sets[0]);

            const cards = await getCardsBySetName(setName);
            if (cards.length === 0) {
                return res.status(404).send({ error: 'Cards not found' });
            }
            // console.log(cards[0]);

            if (sets.length === 0) {
                return res.status(404).send({ error: 'Set not found' });
            }

            set = sets[0]; // Assuming we want the first set with the matching name
            console.log(set);
            await db.collection('sets').insertOne(set);
            await db.collection('cards').insertMany(cards);

        }

        res.json(set);
    } catch (error) {
        console.error('Error fetching set:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { getSetByName };
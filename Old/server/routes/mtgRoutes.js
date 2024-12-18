const express = require('express');
const router = express.Router();
const mtg = require('mtgsdk');
const { getSetByName } = require('../controllers/getSetsByName');

router.get('/sets', getSetByName);

router.get('/set', (req, res) => {
    const { setName } = req.query;
    mtg.card.all({ setName: 'ravnica', pageSize: 1 })
        .on('data', card => {
            console.log("anycards?");
            console.log(card);
        });
});

router.get('/set2', (req, res) => {
    const { setName, page } = req.query;
    mtg.card.where({ setName: setName, pageSize: 100, page: page })
        .then(cards => {
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

module.exports = router;
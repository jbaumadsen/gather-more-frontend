const mtg = require('mtgsdk');

async function getCardsBySetName(setName) {
  return new Promise((resolve, reject) => {
    const cards = [];
    console.log(setName + ' in get cards');
    mtg.card.all({ setName: setName, pageSize: 100 })
      .on('data', card => {
        cards.push(card);
      })
      .on('end', () => {
        console.log(`${cards.length} cards fetched for ${setName}`);
        resolve(cards);
      })
      .on('error', err => {
        console.error(err);
        reject(err);
      });
  });
}

module.exports = { getCardsBySetName };
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: String,
  layout: String,
  name: String,
  names: [String],
  manaCost: String,
  cmc: Number,
  colors: [String],
  colorIdentity: [String],
  type: String,
  supertypes: [String],
  types: [String],
  subtypes: [String],
  rarity: String,
  set: String,
  setName: String,
  text: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  loyalty: String,
  multiverseid: Number,
  imageUrl: String,
  variations: [String],
  printings: [String],
  originalText: String,
  originalType: String,
  legalities: [
    {
      format: String,
      legality: String,
    },
  ],
  source: String,
  rulings: [
    {
      date: Date,
      text: String,
    },
  ],
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
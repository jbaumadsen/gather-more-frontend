const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  code: String,
  name: String,
  type: String,
  border: String,
  mkm_id: Number,
  booster: [[String]],
  mkm_name: String,
  releaseDate: Date,
  magicCardsInfoCode: String,
  block: String,
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
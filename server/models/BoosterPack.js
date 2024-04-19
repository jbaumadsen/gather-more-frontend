const mongoose = require('mongoose');

const boosterPackSchema = new mongoose.Schema({
  set: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Set',
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
  packSlots: [
    {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'mythic', 'land', 'token'],
    },
  ],
  isFoil: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BoosterPack = mongoose.model('BoosterPack', boosterPackSchema);

module.exports = BoosterPack;
const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      picks: [
        {
          round: {
            type: Number,
            required: true,
          },
          card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true,
          },
        },
      ],
    },
  ],
  boosterPacks: [
    {
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
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
});

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
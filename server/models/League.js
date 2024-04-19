const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: false },
  maxNumberOfPlayers: { type: Number, required: false },
  teamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  ruleSet: { type: String, required: false },
  cardSets: [{ type: String, required: false }],
  hasDraft: { type: Boolean, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  format: { type: String, required: false },
  season: { type: String, required: false },
  currentRound: { type: Number, required: false },
  status: { type: String, required: false },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, {
  timestamps: true,
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;
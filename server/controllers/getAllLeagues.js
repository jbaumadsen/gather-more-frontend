const League = require('../models/League');

const getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.find({});
    res.status(200).json(leagues);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
};

module.exports = { getAllLeagues };
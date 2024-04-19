const express = require('express');
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');
const League = require('../models/League');
const { getAllLeagues } = require('../controllers/getAllLeagues');

const router = express.Router();

const verifyToken = async (req, res, next) => {
  console.log('verifying token');
  console.log('req.headers are:', req.headers);
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token is:', token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('unauthorized');
    res.status(401).send('Unauthorized');
  }
};

router.post('/signup', async (req, res) => {
  console.log('req.body is:', req.body);
  console.log('req.headers are:', req.headers);
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const newUser = new User({ email: userRecord.email, authorized: false });
    await newUser.save();

    res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('hittin login');
  try {
    const user = await admin.auth().getUserByEmail(email);

    const token = await admin.auth().createCustomToken(user.uid);

    res.status(200).send({ token });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      res.status(404).send('User not found');
    } else if (error.code === 'auth/invalid-password') {
      res.status(401).send('Invalid password');
    } else {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  }
});

router.get('/allLeagues', verifyToken, getAllLeagues);

router.post('/leagues', async (req, res) => {
  try {
    const { name, format, startDate, endDate } = req.body;

    const newLeague = new League({
      name,
      format,
      startDate,
      endDate,
    });

    const savedLeague = await newLeague.save();
    res.status(201).json(savedLeague);
  } catch (error) {
    console.error('Error adding league:', error);
    res.status(500).json({ error: 'Failed to add league' });
  }
});

router.put('/leagues/:leagueId', async (req, res) => {
  verifyToken()(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const { leagueId } = req.params;
      const updateData = req.body;

      const updatedLeague = await League.findByIdAndUpdate(leagueId, updateData, { new: true });

      if (!updatedLeague) {
        return res.status(404).send('League not found');
      }

      res.status(200).json(updatedLeague);
    } catch (error) {
      console.error(error);
      res.status(400).send('Error updating league');
    }
  });
});

module.exports = router;
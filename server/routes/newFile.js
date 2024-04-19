router.post('/leagues', (req, res) => {
  verifyToken()(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

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
});
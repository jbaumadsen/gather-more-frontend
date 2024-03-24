require('dotenv').config();
const express = require('express');
const path = require('path');
const mtgRoutes = require('./routes/mtgRoutes');
const app = express();

app.use('/api/mtg', mtgRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
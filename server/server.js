require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./db/db');
const mtgRoutes = require('./routes/mtgRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use('/mtg', mtgRoutes);
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
require('dotenv').config();
console.log('AI API Key:', process.env.AI_API_KEY);
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');

const scavengerRouter = require('./routes/scavenger');
const photoRouter = require('./routes/photo');
const seedRouter = require('./routes/seed');
const challengesRouter = require('./routes/challenges');
const badgesRouter = require('./routes/badges');
const socialRoutes = require('./routes/socials');
const listRoutes = require('./routes/lists');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware for routes
app.use('/scavenger', scavengerRouter);
app.use('/photos', photoRouter);
app.use('/seed', seedRouter);
app.use('/challenges', challengesRouter);
app.use('/badges', badgesRouter);
app.use('/social', socialRoutes);
app.use('/lists', listRoutes);

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://jnstaley1:L1yZNjKaMSa261VH@database.vxt7mme.mongodb.net/Lists', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the Lists database');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch(err => {
        console.error('Could not connect to Lists database:', err);
    });

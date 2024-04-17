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

// Setup file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware for routes
app.use('/scavenger', scavengerRouter);
app.use('/photos', photoRouter);
app.use('/seed', seedRouter);
app.use('/challenges', challengesRouter);
app.use('/badges', badgesRouter);
app.use('/social', socialRoutes);
app.use('/lists', listRoutes);

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.get('/upload', async (req, res) => {
    try {
        const uploads = await Upload.find({});
        res.json(uploads);
    } catch (error) {
        console.error('Failed to fetch uploads:', error);
        res.status(500).send('Failed to fetch uploads');
    }
});

app.get('/lists', async (req, res) => {
    try {
        const lists = await List.find({});
        res.json(lists);
    } catch (error) {
        console.error('Failed to fetch lists:', error);
        res.status(500).send('Failed to fetch lists');
    }
});

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://jnstaley1:L1yZNjKaMSa261VH@database.vxt7mme.mongodb.net/Lists', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the Lists database');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch(err => {
        console.error('Could not connect to Lists database:', err);
    });

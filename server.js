require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');

const scavengerRouter = require('./routes/scavenger');
const photoRouter = require('./routes/photo');
const seedRouter = require('./routes/seed');
const challengesRouter = require('./routes/challenges');
const badgesRouter = require('./routes/badges');
const socialRoutes = require('./routes/social');
const socialShareRoutes = require('./routes/socialShare');

const app = express();
app.use(express.json());
app.use(cors());


// Setup for multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

app.use('/scavenger', scavengerRouter);
app.use('/photos', photoRouter);
app.use('/seed', seedRouter);
app.use('/challenges', challengesRouter);
app.use('/badges', badgesRouter);
app.use('/social', socialRoutes);
app.use('/socialShare', socialShareRoutes);

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
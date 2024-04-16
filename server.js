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
const socialRoutes = require('./routes/socials');
const socialShareRoutes = require('./routes/socialShare');
const photoRoutes = require('./routes/photoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes usage
app.use('/scavenger', scavengerRouter);
app.use('/photos', photoRouter);
app.use('/seed', seedRouter);
app.use('/challenges', challengesRouter);
app.use('/badges', badgesRouter);
app.use('/social', socialRoutes);
app.use('/socialShare', socialShareRoutes);
app.use('/photos', photoRoutes);

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
        console.log('Connected to the database');
    })
    .catch(err => console.error('Could not connect to database:', err));

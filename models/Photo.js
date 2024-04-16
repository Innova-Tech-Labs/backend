const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imagePath: String,
});

module.exports = mongoose.model('Photo', photoSchema);

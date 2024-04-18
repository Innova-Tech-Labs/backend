const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    items: [{ type: Object }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;

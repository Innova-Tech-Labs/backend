const mongoose = require('mongoose');

const scavengerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    tasks: [{
        description: String,
        points: Number,
        proofOfCompletion: String // URL to the completion proof
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Scavenger', scavengerSchema);

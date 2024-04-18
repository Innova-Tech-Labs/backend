const mongoose = require('mongoose');
require('dotenv').config();

const Scavenger = require('./models/Scavenger.js');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to the database');

    const scavengerData = {
      title: 'Explore Central Park',
      description: 'Find hidden treasures in Central Park.',
      location: 'Central Park, NY',
      tasks: [
        { description: 'Find the Alice in Wonderland statue', points: 10 },
        { description: 'Locate the oldest tree in the park', points: 20 }
      ],
      createdBy: new mongoose.Types.ObjectId(),
      participants: [new mongoose.Types.ObjectId()]
    };

    const result = await Scavenger.create(scavengerData);
    console.log('Scavenger hunt created!', result);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
    throw error; // Rethrow the error to handle it in the caller
  }
}

module.exports = seed;

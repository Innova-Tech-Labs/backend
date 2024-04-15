const mongoose = require('mongoose');
require('dotenv').config();

const Scavenger = require('./models/Scavenger.js'); 

async function seed() {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  await mongoose.connection.once('open', async () => {
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

    try {
      const result = await Scavenger.create(scavengerData);
      console.log('Scavenger hunt created!', result);
      mongoose.disconnect();
    } catch (error) {
      console.error('Error seeding data:', error);
      mongoose.disconnect();
    }
  });
}

seed();

const { describeImage } = require('../models/aiService');

// Path to your test image
const imagePath = './image/dog.jpeg';

describeImage(imagePath)
  .then(description => {
    console.log('Image description:', description);
  })
  .catch(error => {
    console.error('Failed to describe image:', error.message);
  });

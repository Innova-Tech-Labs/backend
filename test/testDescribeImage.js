const { processImage } = require('../models/aiService');

// Path to your test image
const imagePath = './image/dog.jpeg';

processImage(imagePath)
  .then(description => {
    console.log('Image description:', description);
  })
  .catch(error => {
    console.error('Failed to describe image:', error.message);
  });

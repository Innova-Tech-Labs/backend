const axios = require('axios');

const AI_API_URL = 'insert-link';  // use actual URL of your AI service endpoint
const AI_API_KEY = process.env.AI_API_KEY; // update with  API key whenit's available

async function checkImageAgainstItems(imageBuffer) {
    try {
        const response = await axios.post(`${AI_API_URL}/image-check`, imageBuffer, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'Content-Type': 'application/octet-stream'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error calling AI service:', error);
        throw new Error('Failed to verify image with AI service');
    }
}

module.exports = {
    checkImageAgainstItems
};

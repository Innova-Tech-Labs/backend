const axios = require('axios');

const AI_API_URL = 'https://api.openai.com/v1/chat/completions'; 
const AI_API_KEY = process.env.AI_API_KEY;

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

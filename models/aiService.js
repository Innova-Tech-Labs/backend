const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');




async function describeImage(imagePath) {
    const data = new FormData();
    data.append('file', fs.createReadStream(imagePath));

    try {
        const AI_API_URL = process.env.AI_API_URL;
        const AI_API_KEY = process.env.AI_API_KEY;
        console.log(AI_API_URL);
        console.log(AI_API_KEY);
        const response = await axios.post(`${AI_API_URL}/generate-description`, data, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'Content-Type': 'multipart/form-data',
                ...data.getHeaders()
            }
        });
        return response.data.choices[0].text; // Adjust based on actual API response
    } catch (error) {
        console.error('Error calling AI service:', error);
        throw new Error('Failed to describe image with AI service');
    }
}

module.exports = {
    describeImage
};

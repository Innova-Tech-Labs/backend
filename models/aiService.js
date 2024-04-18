require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
// OpenAI API Key and URL from environment variables
const apiKey = process.env.AI_API_KEY;
const apiUrl = process.env.AI_API_URL;
// Function to encode the image
function encodeImage(imagePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
// Async function to send the image to OpenAI and get a description
async function describeImage(base64Image, originalName, mimeType) {
    try {
        console.log("image", originalName, mimeType, base64Image)
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };
        const payload = {
            "model": "gpt-4-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What’s in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": { url: `data:${mimeType};base64,${base64Image}` }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        };
        const response = await axios.post(apiUrl, payload, { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error!', error.response ? error.response.data : error.message);
    }
}


module.exports = {
    describeImage
};

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const OpenAI = require('openai');

const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;


const openai = new OpenAI({ apiKey: AI_API_KEY });

async function describeImage() {
    console.log(AI_API_KEY);
    console.log(openai);
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What’s in this image?" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        },
                    },
                ],
            },
        ],
    });
    console.log(response.choices[0]);
}



async function describeImageOld(imagePath) {
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

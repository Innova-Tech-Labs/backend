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
async function describeImage(imagePath) {
    try {
        const base64Image = await encodeImage(imagePath);
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
                            "type": "image",
                            "image": `data:image/jpeg;base64,${base64Image}`
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
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
// Path to your image
const imagePath = './path_to_your_image.jpg';
describeImage(imagePath);


// require('dotenv').config();
// const axios = require('axios');
// const fs = require('fs');
// const FormData = require('form-data');
// const OpenAI = require('openai');

// const AI_API_URL = process.env.AI_API_URL;
// const AI_API_KEY = process.env.AI_API_KEY;


// const openai = new OpenAI({ apiKey: AI_API_KEY });

// async function describeImage() {
//     console.log(AI_API_KEY);
//     console.log(openai);
//     const response = await openai.chat.completions.create({
//         model: "gpt-4-turbo",
//         messages: [
//             {
//                 role: "user",
//                 content: [
//                     { type: "text", text: "What’s in this image?" },
//                     {
//                         type: "image_url",
//                         image_url: {
//                             "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//                         },
//                     },
//                 ],
//             },
//         ],
//     });
//     console.log(response.choices[0]);
// }



// async function describeImageOld(imagePath) {
//     const data = new FormData();
//     data.append('file', fs.createReadStream(imagePath));

//     try {
//         const AI_API_URL = process.env.AI_API_URL;
//         const AI_API_KEY = process.env.AI_API_KEY;
//         console.log(AI_API_URL);
//         console.log(AI_API_KEY);
//         const response = await axios.post(`${AI_API_URL}/generate-description`, data, {
//             headers: {
//                 'Authorization': `Bearer ${AI_API_KEY}`,
//                 'Content-Type': 'multipart/form-data',
//                 ...data.getHeaders()
//             }
//         });
//         return response.data.choices[0].text; // Adjust based on actual API response
//     } catch (error) {
//         console.error('Error calling AI service:', error);
//         throw new Error('Failed to describe image with AI service');
//     }
// }

// module.exports = {
//     describeImage
// };

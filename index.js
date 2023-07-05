// const { Configuration, OpenAIApi } = require("openai");
// require("dotenv").config();
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// async function d() {
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "Say this is a test",
//         max_tokens: 7,
//         temperature: 0,
//       });
//       console.log("res",response)
// }

// d();



import axios from 'axios';
require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;

const linksContainer = document.getElementById('links-container');

// const client = axios.create({
//     headers : {
//         Authorization : "Bearer " + apiKey,
//     },
// })

const config = {
    headers: { Authorization: `Bearer ${apiKey}` }
};


// const params = {
//     prompt : "How are you?",
//     model : "text-davinci-003",
//     max_tokens : 10,
//     temperature: 0,
// }

// client.post("https://api.openai.com/v1/completions", params)
// .then((result) => {
//     console.log(result.data.choices[0].text);
// }).catch((err) => {
//     console.log(err);
// })

chatWithAI = async () => {
    document.getElementById('span1').innerHTML = 'Processing🔜';
    const params = {
        prompt : chat.value,
        model : "text-davinci-003",
        max_tokens : 1000,
        temperature: 0,
    }
    axios.post("https://api.openai.com/v1/completions", params, config)
    .then((result) => {
        console.log(result.data.choices[0].text);
        document.getElementById('span1').innerHTML = result.data.choices[0].text;
    }).catch((err) => {
        console.log(err);
    })
}
const chat = document.getElementById("chat")
const getchat = document.getElementById("getchat")
getchat.onclick = chatWithAI;


// const params = {
//     "prompt": "A cute baby sea otter",
//     "n": 2,
//     "size": "1024x1024"
// }

// client.post("https://api.openai.com/v1/images/generations", params)
// .then((result) => {
//     console.log(result.data);
// }).catch((err) => {
//     console.log(err);
// })


CreateImage = async () => {
    document.getElementById('span2').innerHTML = 'Processing🔜';
    const params = {
        "prompt": Image.value,
        "n": 5,
        "size": "1024x1024"
    }

    axios.post("https://api.openai.com/v1/images/generations", params, config)
    .then((result) => {
        document.getElementById('span2').innerHTML = '✅';
            console.log(result.data);
            result.data.data.forEach(link => {
            console.log("url",link);
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.url;
            linksContainer.appendChild(anchor);
            linksContainer.appendChild(document.createElement('br')); // Optional line break
        });
    }).catch((err) => {
        console.log(err);
    })

    
}

const Image = document.getElementById("Image")
const createImage = document.getElementById("createImage")
createImage.onclick = CreateImage;
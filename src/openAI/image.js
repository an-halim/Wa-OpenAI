//  openai
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const keyopenai = process.env.OPENAI_API_KEY;

module.exports = async function openai(message) {
  try {
    const configuration = new Configuration({
      apiKey: keyopenai,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createImage({
      prompt: message,
      n: 1,
      size: "1024x1024",
    });
  
    // return response.data.data[0].url;
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
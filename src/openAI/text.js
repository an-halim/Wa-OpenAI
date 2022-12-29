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
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response;
  } catch (error) {
    console.log(error?.response?.data?.error);
    return error;
  }
}
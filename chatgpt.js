require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

async function callChatGPT(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 1000,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error calling ChatGPT API: ", error);
    return null;
  }
}

module.exports = { callChatGPT };

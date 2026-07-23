const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await result.json();

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();
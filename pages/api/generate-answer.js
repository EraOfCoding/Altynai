const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
};


export default async function handler(req, res) {
    const prompt = req.body.prompt;
  
    if (!prompt || prompt === "") {
      return new Response("Please send your prompt", { status: 400 });
    }
  
    try {
        const aiResult = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {role: "user", content: prompt, stream: true,}
        ]
        });

        const stream = await OpenAIStream(payload);
        return new Response(stream);
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const preguntaElaborada = req.body.pregunta_elaborada || '';
  const respuestaCorta = req.body.respuesta_corta || '';
  if (preguntaElaborada.trim().length === 0 || respuestaCorta.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid elaborated question and short answer",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(preguntaElaborada, respuestaCorta),
      temperature: 0.6,
      max_tokens: 100, // Adjust the number of max tokens as needed
    });
    res.status(200).json({ result: completion.data.choices[0].text.trim() });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(preguntaElaborada, respuestaCorta) {
  return `${preguntaElaborada}\nRespuesta corta: ${respuestaCorta}\nTexto generado:`;
}

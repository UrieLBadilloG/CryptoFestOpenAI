// Importar las bibliotecas necesarias
const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Leer la clave de API de OpenAI desde las variables de entorno
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Definir los encabezados de la solicitud HTTP para la API de OpenAI
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`
};

// Función asíncrona para llamar a la API de OpenAI
async function callOpenAI(prompt) {
    try {
      // Configurar los parámetros de la API de OpenAI
      const data = {
        "prompt": `Dame 10 palabras que esten relacionadas con la palabra ${prompt}`,
        "max_tokens": 50,
        "n": 1,
        "stop": null,
        "temperature": 1,
        "top_p": 1
      };
  
      // Realizar una solicitud POST a la API de OpenAI y obtener la respuesta
      const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-002/completions", data, { headers });
  
      // Devolver el texto generado por el modelo de lenguaje
      return response.data.choices[0].text;
    } catch (error) {
      // Imprimir errores al llamar a la API de OpenAI
      console.error("Error al llamar a la API de OpenAI:", error.response.data);
    }
  }
  

// Crear una instancia del servidor Express
const app = express();

// Permitir que el servidor maneje solicitudes con cuerpos JSON
app.use(express.json());

// Definir un endpoint POST en la ruta "/openai"
app.post("/openai", async (req, res) => {
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = req.body.prompt;

  // Llamar a la API de OpenAI con el "prompt" y obtener la respuesta
  const response = await callOpenAI(prompt);

  // Devolver la respuesta en formato JSON
  res.json({ response });
});

// Definir el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

import express from "express";
import pkg from "youtube-transcript";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import axios from "axios"; // Make sure to import axios

import cors from "cors";
const { YoutubeTranscript } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000; // Use the port from the environment variable or default to 3000
app.use(express.static(path.resolve(__dirname, "my-vue-app/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const GPT4TurboModel = "gpt-4-1106-preview";
const GPT3 = "gpt-3.5-turbo-1106";

let context = [];
const prompts = ["Create a note that is like a tutorial and give it a relevant title",
  "based on this youtube transcript and return your note in markdown format",
  "answer (return in markdown) only this question in brief based on the chat context I am giving you return your answer in markdown format Here is the context - "];
const GPTKEY = process.env.OPENAI_API_KEY; // Ensure the environment variable name is correct
const openai = new OpenAI({ apiKey: GPTKEY });

async function getTutorialNotes(prompt, contextDefiner, transcript) {
  try {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {

          model: GPT3,
          messages: [
            {
              role: "user",
              content: `${prompt} ${contextDefiner}: ${transcript}`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GPTKEY}`,
          },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling OpenAI to generate tutorial notes:", error);
    throw error;
  }
}

async function getYoutubeTranscript(url) {
  try {
    let tObj = await YoutubeTranscript.fetchTranscript(url);
    return tObj.map((e) => e.text).join(" ");
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error);
    throw error;
  }
}

app.post("/generate", async (req, res) => {
  let url = req.body.link; // Get the YouTube URL from the form
  try {
    let transcript = await getYoutubeTranscript(url);
    let resData = await getTutorialNotes(prompts[0], prompts[1], transcript);
    let tutNotes = resData.choices[0].message.content;
    context.push(tutNotes);
    res.json({ notes: tutNotes, obj: resData });
  } catch (error) {
    res.json({ output: url, error: "Invalid URL or no captions available." });
  }
});

app.post("/ask", async (req, res) => {
  let quest = req.body.prompt; // Get the YouTube URL from the form
  try {
    console.log(context.toString());

    let resData = await getTutorialNotes(quest, prompts[2], context.join(" "));

    let gptRespOnQuestion = resData.choices[0].message.content;
    context.push(gptRespOnQuestion);
    res.json({ answer: gptRespOnQuestion, obj: resData });
  } catch (error) {
    res.json({ error: "getTutorialNotes on /ask caused errors" });
  }
});

// Root route to render the initial form
app.get("/", (req, res) => {
  context = [];
  res.sendFile(path.resolve(__dirname, "my-vue-app/dist/index.html"));
});

app.post("/refresh", (req, res)=>{
  context = [];
  res.status(200).json({ message: 'Refreshed successfully'});

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

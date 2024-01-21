import express from "express";
import pkg from 'youtube-transcript';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from "openai";
import axios from 'axios'; // Make sure to import axios

import cors from "cors";
const { YoutubeTranscript } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000; // Use the port from the environment variable or default to 3000
app.use(express.static(path.resolve(__dirname, 'my-vue-app/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const GPTKEY = process.env.OPENAI_API_KEY; // Ensure the environment variable name is correct
const openai = new OpenAI({ apiKey: GPTKEY });

async function getTutorialNotes(transcript) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                // model: "gpt-4-1106-preview",
                model: "gpt-3.5-turbo-1106",
                messages: [{
                    "role": "user",
                    "content": `Create a tutorial note based on this youtube transcript and return your note in markdown format: ${transcript}`
                }],
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GPTKEY}`
                }
            }
        );
        return response.data
    } catch (error) {
        console.error('Error calling OpenAI to generate tutorial notes:', error);
        throw error;
    }
}

async function getYoutubeTranscript(url) {
    try {
        let tObj = await YoutubeTranscript.fetchTranscript(url);
        return tObj.map(e => e.text).join(' ');
    } catch (error) {
        console.error('Error fetching YouTube transcript:', error);
        throw error;
    }
}

app.post("/generate", async (req, res) => {
    let url = req.body.link; // Get the YouTube URL from the form
    try {
        let transcript = await getYoutubeTranscript(url);
        let output = await getTutorialNotes(transcript);
        res.json({ notes: output.choices[0].message.content});
    } catch (error) {
        res.json({ output: url, error: "Invalid URL or no captions available." });
    }
});

// Root route to render the initial form
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-vue-app/dist/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


import express from "express";
import pkg from 'youtube-transcript';
import 'dotenv/config';
import cors from "cors";
const { YoutubeTranscript } = pkg;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const GPTKEY = process.env.apiKey
function getYoutubeTranscript(url) {
  return YoutubeTranscript.fetchTranscript(url).then((tObj) => {
    let summedTranscript = ''
    tObj.forEach((e)=>{
        summedTranscript = summedTranscript+ e.text; 
    })
   return summedTranscript
  });
}




app.post("/generate", (req, res) => {
    let url = req.body['link']; // Get the YouTube URL from the form
    getYoutubeTranscript(url).then((transcript) => {
     
      res.json({ url: url, transcript: transcript});
    })
    .catch(error => {
        console.log(url)
      res.json({ url: url, error: "Invalid URL or no captions available." });
    });
  });
  





// Root route to render the initial form
app.get("/", (req, res) => {
  res.send("Hello")
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express"
const app = express();
const port = 3000;
import { YoutubeTranscript } from 'youtube-transcript';

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})





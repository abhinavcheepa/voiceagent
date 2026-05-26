import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const VOICE_ID = process.env.VOICE_ID;

app.get("/", (req, res) => {
  res.send("Fish Audio Middleware Running ✅");
});

app.post("/tts", async (req, res) => {

  try {

    console.log(req.body);

    const text = req.body.text || req.body.message;

    console.log("Incoming Text:", text);

    // rest same

    const response = await axios.post(

      "https://api.fish.audio/v1/tts",

      {
        text: text,
        reference_id: VOICE_ID
      },

      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }

    );

    console.log("Audio generated successfully");

    res.setHeader("Content-Type", "audio/mpeg");

    res.send(response.data);

  } catch (error) {

    console.log("FULL ERROR:");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data.toString());
    } else {
      console.log(error.message);
    }

    res.status(500).send("TTS ERROR");

  }

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
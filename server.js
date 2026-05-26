import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "cb7722f07fb74b75bd85c6eb9a0c0342";
const VOICE_ID = "67919906ddca447ca480b2ed38bde734";

app.get("/", (req, res) => {
  res.send("Fish Audio Middleware Running ✅");
});

app.post("/tts", async (req, res) => {

  try {

    console.log("FULL BODY:", req.body);

    const text =
      req.body.text ||
      req.body.message ||
      req.body.input ||
      "Hello";

    console.log("Incoming Text:", text);

    const response = await axios({

      method: "POST",

      url: "https://api.fish.audio/v1/tts",

      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },

      data: {
        text: text,
        voice_id: VOICE_ID
      },

      responseType: "arraybuffer",

      timeout: 30000

    });

    res.set({
      "Content-Type": "audio/mpeg"
    });

    res.send(response.data);

  } catch (error) {

    console.log("ERROR:");

    console.log(
      error.response?.data?.toString() ||
      error.message
    );

    res.status(500).send("Fish Audio TTS Error");

  }

});

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {

  console.log(`✅ Server running on port ${PORT}`);

});
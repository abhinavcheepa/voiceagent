// import express from "express";
// import axios from "axios";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// const API_KEY = "af4f08fa4ffd447fb0fc51ab5d85d869";
// const VOICE_ID = "67919906ddca447ca480b2ed38bde734";

// app.post("/tts", async (req, res) => {
//   try {

//     const text = req.body.text;

//     console.log("Incoming text:", text);

//     const response = await axios({
//       method: "POST",
//       url: "https://api.fish.audio/v1/tts",

//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json"
//       },

//       data: {
//         text: text,
//         reference_id: VOICE_ID
//       },

//       responseType: "arraybuffer"
//     });

//     res.set({
//       "Content-Type": "audio/mpeg"
//     });

//     res.send(response.data);

//   } catch (err) {

//     console.log(err.response?.data || err.message);

//     res.status(500).send("Fish Audio TTS Error");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/*
========================================
ENV VARIABLES
========================================
*/

const API_KEY = process.env.API_KEY;
const VOICE_ID = process.env.VOICE_ID;
console.log(req.body);
/*
========================================
TEST ROUTE
========================================
*/

app.get("/", (req, res) => {
  res.send("Fish Audio Middleware Running ✅");
});

/*
========================================
TTS ROUTE
========================================
*/

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
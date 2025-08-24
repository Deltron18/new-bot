import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Allow all origins (you can restrict it to your frontend domain if needed)
app.use(cors({
  origin: "https://new-bot-sigma-swart.vercel.app",
  credentials: true,
}));
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(400).json(error);
    }

    const blob = await response.arrayBuffer(); // Hugging Face returns an image
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(blob));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

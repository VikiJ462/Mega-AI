import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// slouží statické soubory (index.html) z public/
app.use(express.static(path.join(__dirname, "public")));

const API_KEY = process.env.SERPHOUSE_API_KEY; // API KEY je jen v Renderu
const ENDPOINT = "https://api.serphouse.com/serp/google/organic";

// Proxy endpoint
app.post("/search", async (req, res) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));

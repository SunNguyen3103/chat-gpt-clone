const PORT = 8000;
// import express, { json } from "express";
// import cors from "cors";
// const app = express();
// app.use(json());
// app.use(cors());
import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(json());
app.use(cors());
const API_KEY = "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";
app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
          max_tokens: 100,
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

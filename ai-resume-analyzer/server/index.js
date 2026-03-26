const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const resumeWords = resumeText.toLowerCase().split(" ");
  const jdWords = jobDescription.toLowerCase().split(" ");

  let match = 0;

  jdWords.forEach(word => {
    if (resumeWords.includes(word)) {
      match++;
    }
  });

  const score = ((match / jdWords.length) * 100).toFixed(2);

  const missing = jdWords.filter(word => !resumeWords.includes(word));

  res.json({
    score,
    missing: [...new Set(missing)].slice(0, 10)
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
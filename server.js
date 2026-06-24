const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "likesoar123";

app.use((req, res, next) => {
  console.log("REQUEST GELDİ:", req.method, req.url);
  console.log("QUERY:", req.query);
  console.log("BODY:", JSON.stringify(req.body, null, 2));
  next();
});

app.get("/", (req, res) => {
  res.send("LikeSoar Bot Çalışıyor");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK DOĞRULANDI");
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Forbidden");
});

app.post("/webhook", (req, res) => {
  console.log("WHATSAPP POST WEBHOOK GELDİ");
  return res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

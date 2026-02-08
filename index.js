import express from "express";

const app = express();
app.use(express.json({ strict: false }));

const NOTIFY_EVENTS_URL =
  "https://notify.events/api/v1/channel/source/nuui6bbgxpzhrosxstxjlsananhtauzn/execute";

app.post("/goalert", async (req, res) => {
  try {
    if (req.body?.verification_code) {
      const code = req.body.verification_code;

      console.log("GoAlert verification code received:", code);

      return res.status(200).send(code);
    }

    const form = new FormData();
    form.append("title", "Attention!");
    form.append("text", "Something just happened!");
    form.append("priority", "highest");
    form.append("level", "error");

    await fetch(NOTIFY_EVENTS_URL, {
      method:

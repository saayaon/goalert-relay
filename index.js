import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json({ strict: false }));

const NOTIFY_EVENTS_URL = process.env.NOTIFY_EVENTS_URL;

app.post("/goalert", async (req, res) => {
  try {
    console.log("GoAlert request received:", req.body);
    if (req.body?.code) {
      const code = req.body.code;

      console.log("GoAlert verification code received:", code);
      return res.status(200).send(code);
    }

    const form = new FormData();
    form.append("title", "Alert");
    form.append("text", "Prod Alert");
    form.append("priority", "highest");
    form.append("level", "error");

    await fetch(NOTIFY_EVENTS_URL, {
      method: "POST",
      body: form
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error("Relay error:", err);
    res.status(200).send("OK");
  }
});

app.listen(3000, () => {
  console.log("GoAlert relay running on port 3000");
  console.log("NOTIFY_EVENTS_URL:", NOTIFY_EVENTS_URL);
});

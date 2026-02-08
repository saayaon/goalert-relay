import express from "express";

const app = express();
app.use(express.json({ strict: false }));

const NOTIFY_EVENTS_URL =
  "https://notify.events/api/v1/channel/source/nuui6bbgxpzhrosxstxjlsananhtauzn/execute";

app.post("/goalert", async (req, res) => {
  try {
    // 🔑 1️⃣ GoAlert verification handling
    if (req.body?.verification_code) {
      const code = req.body.verification_code;

      // ✅ PRINT the verification code
      console.log("GoAlert verification code received:", code);

      // ✅ ECHO it back (plain text, exactly)
      return res.status(200).send(code);
    }

    // 🔔 2️⃣ Normal alert flow → notify.events
    const form = new FormData();
    form.append("title", "Attention!");
    form.append("text", "Something just happened!");
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
});

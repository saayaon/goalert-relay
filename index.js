import express from "express";

const app = express();
app.use(express.json({ strict: false }));

const NOTIFY_EVENTS_URL =
  "https://notify.events/api/v1/channel/source/nuui6bbgxpzhrosxstxjlsananhtauzn/execute";

app.post("/goalert", async (_req, res) => {
  try {
    const form = new FormData();
    form.append("title", "EU DC Alert");
    form.append("text", "EU DC Alert");
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

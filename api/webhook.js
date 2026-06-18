export default async function handler(req, res) {

  // VERIFY WEBHOOK
  if (req.method === "GET") {

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified");

        return res.status(200).send(challenge);
      }

      return res.sendStatus(403);
    }
  }

  // RECEIVE EVENTS
  if (req.method === "POST") {

    console.log(
      JSON.stringify(req.body, null, 2)
    );

    return res.sendStatus(200);
  }

  return res.sendStatus(405);
}

require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
app.use(express.json({}));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "stripe-samples/terminal-series/stripe-terminal-collect-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples",
  },
});

app.get("/readers", async (req, res) => {
  try {
    const { data: readers } = await stripe.terminal.readers.list();
    res.send({ readersList: readers });
  } catch (e) {
    res.send({ error: { message: e.message } });
  }
});

app.listen(4242, () =>
  console.log(`Node server listening at http://localhost:4242`)
);

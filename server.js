const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Telegram bot data
const TOKEN = "8413348505:AAFYuQ079R0sXdfyxSC87yYWSRtgslPGmhI";
const ADMIN_ID = "2013703324";

app.post("/withdraw", async (req, res) => {
  const { userId, amount } = req.body;

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: ADMIN_ID,
    text: ❗️ Запрос на вывод\nID: ${userId}\nСумма: ${amount} монет
  });

  res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("QadamCoin bot server is running!");
});

app.listen(3000, () => console.log("Server started on port 3000"));

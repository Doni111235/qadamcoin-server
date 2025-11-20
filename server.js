import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = "8413348505:AAFYuQ079R0sXdfyxSC87yYWSRtgslPGmhI";
const ADMIN_ID = "2013703324";

// Главная
app.get("/", (req, res) => {
  res.send("QadamCoin server is running!");
});

// Маршрут для вывода монет
app.post("/withdraw", async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).send({ error: "Missing fields" });
  }

  // 💥 ВАЖНО — без шаблонных строк с эмодзи!
  const message =
    "⚠️ Запрос на вывод монет\n\n" +
    "ID пользователя: " + userId + "\n" +
    "Сумма: " + amount + " монет";

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_ID,
      text: message,
      parse_mode: "Markdown"
    }),
  });

  res.send({ success: true });
});

// Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

const Telegram = require("node-telegram-bot-api");

let fetch = require("cross-fetch");

const token = "2132782055:AAGvfEzGv6FjMY5RKmmUIqTcBXAzUGW4Aew";
const bot = new Telegram(token, { polling: true });

bot.on("message", (msg) => {
  const id = msg.from.id;
  const text = msg.text;
  if (text == "/start" || text == "/valyuta") {
    return false;
  }
  fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const index = data.findIndex((item) => {
        return item.CcyNm_UZ == text;
      });
      if (index == -1) {
        bot.sendMessage(id, "Bunday valyuta topilmadi");
      } else {
        bot.sendMessage(id, data[index].Rate + " so'm", {
          reply_markup: {
            remove_keyboard: true,
          },
        });

        bot.sendMessage(id, data[index].Date + " sana", {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
    });
});

bot.onText(/\/start/, (msg) => {
  // console.log(msg)
  const id = msg.from.id;
  bot.sendMessage(
    id,
    "Welcome  " + msg.from.first_name + "  Valyutani tanlang",
    {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [["/valyuta"]],
      },
    }
  );
});

bot.onText(/\/valyuta/, (msg) => {
  // console.log(msg)
  const id = msg.from.id;
  bot.sendMessage(
    id,
    "Welcome  " + msg.from.first_name + "  Valyutani tanlang",
    {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          ["AQSH dollari ", "EVRO ", " Rossiya rubli"],
          ["Xitoy yuani ", "Bahraini Dinar ", "Belorus rubli"],
          ["Yaponiya iyenasi", "Misr funti", "Avstraliya dollari"],
          ["Angliya funt sterlingi", " BAA dirhami ", " Turkiya lirasi"],
          [" Singapur dollari ", "Shvetsiya kronasi  ", "Qatar riali  "],
          ["Quvayt dinori", "Koreya Respublikasi voni ", "Kanada dollari"],
        ],
      },
    }
  );
});

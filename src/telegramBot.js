const axios = require('axios');
axios.defaults.timeout = 10000;

module.exports = class TelegramBot {

  constructor(bot, chat) {
    this.bot = bot;
    this.chatId = chat;
  }

  async sendMessage(msg) {
    try {
      await axios.get(`https://api.telegram.org/bot${this.bot}/sendMessage`, {
        params: {
          chat_id: this.chatId,
          parse_mode: 'html',
          text: msg,
        },
      });
    } catch (err) {
      console.log('Error sending telegram message');
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  }
};

require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss');

var glob = require("glob")
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const TelegramBot = require('./telegramBot');

let telegramBot = null;
const bot = process.env.BOT_ID;
const chat = process.env.CHAT_ID;
if (bot) {
  console.log('\x1b[32m%s\x1b[0m', 'Telegram Bot Exists');
  telegramBot = new TelegramBot(bot, chat);
}

const folderName = process.argv[2];
if (!folderName) {
  console.error('\x1b[31m%s\x1b[0m', 'No path with the files to be converted specified, terminatting...');
  process.exit(-1);
}

const fileNameMask = process.argv[3];
if (!folderName) {
  console.error('\x1b[31m%s\x1b[0m', 'No file name pattern for file to be converted specified, terminatting...');
  process.exit(-1);
}

const toFind = `${folderName}\\${fileNameMask}`;
console.log('\x1b[32m', 'Finding...', toFind, '\x1b[0m');

const items = glob.sync(toFind, {});
console.log('\x1b[32m', `Found ${items.length} file(s) to be be converted`, items, '\x1b[0m');

const parser = new Json2csvParser({});

for (let i = 0; i < items.length; i++) {
  try {
    console.log('Starting with file', items[i]);
    const myData = JSON.parse(fs.readFileSync(items[i], 'utf8'));
    console.log(`File read - ${myData.length} entries`);
    const csv = parser.parse(myData);
    console.log(`File parsed`);
    const savedFile = items[i] + '.csv';
    fs.writeFileSync(savedFile, csv);
    console.log('\x1b[32m%s\x1b[0m', `File saved ${savedFile}`);
    if (telegramBot) {
      telegramBot.sendMessage(`File saved ${savedFile}`);
    }
  } catch(e) {
    console.error('\x1b[31m%s\x1b[0m', e.message);
    console.log('\x1b[34m%s\x1b[0m', 'Continue with the next file...');
  }
}

console.log('\x1b[32m%s\x1b[0m', 'Finished');
if (telegramBot) {
  telegramBot.sendMessage('IGConverter finished...');
}

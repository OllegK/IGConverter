# IGConverter
Simple batch converter of JSON files into CSV files.

The Chrome File System could be found (in case if default profiles are used):
* Windows
```bash
cd %USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\File System
```

* Linux
```bash
cd ~/.config/google-chrome/Default/File System
```

# Installation

## Install node.js
Download and install Node.js - [https://nodejs.org/en/download/]. It is better to install LTS.

## Update/Create the .env file
Update/Create the `.env` file:
* BOT_ID
* CHAT_ID

## Download the needed modules
Run at command prompt
```bash
npm install --only=production
```

## Run
Run at command prompt
```bash
npm start ./input/ 0*
```

The input parameters:
* ./input/ - the path the files to be converted are located
* 0* - wildcard of the files to be converted

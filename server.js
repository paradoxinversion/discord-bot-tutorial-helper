require("dotenv").config();
const setupDB = require("./db/client");
const Discord = require("discord.js");
const gameActions = require("./gameActions");
const playerActions = require("./db/actions/player");
setupDB();

const client = new Discord.Client();
let currentKeyword = "SETME";
const POINTS_PER_WIN = 10;

client.on("message", async (msg) => {
  const commandRegex = /!(\w+)\s?(\w+)?/;

  const match = msg.content.match(commandRegex);
  if (match) {
    const command = match[1];

    switch (command) {
      case "register":
        const registration = await playerActions.registerPlayer(msg.author);
        if (registration.result) {
          msg.reply("You have been registered for the keyword game!");
        } else {
          msg.reply(registration.error);
        }
        break;
      case "setword":
        const previousKeyword = currentKeyword;
        const commandVar = match[2];
        currentKeyword = commandVar;
        msg.reply(
          `The new keyword has been set to ${commandVar}. It was previously ${previousKeyword}. Make sure these are different or players won't get new points!`
        );
        break;
      case "mypoints":
        const points = await playerActions.getPoints(msg.author);
        msg.reply(points);
        break;
      default:
        break;
    }
  } else {
    if (!msg.author.bot) {
      const keywordCheck = await gameActions.parseSentence(
        msg.author,
        msg.content,
        currentKeyword,
        POINTS_PER_WIN
      );
      if (keywordCheck.result) {
        msg.author.send(`You got ${POINTS_PER_WIN} points!`);
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);

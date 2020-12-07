require("dotenv").config();
const setupDB = require("./db/client");
const Discord = require("discord.js");

setupDB();

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", (msg) => {
  if (msg.content === "!hello-world") {
    msg.reply("Hello!");
  }
});

client.login(process.env.BOT_TOKEN);

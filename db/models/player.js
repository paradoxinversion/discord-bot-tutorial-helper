const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  discordUserId: String,
  lastCorrectGuess: String,
  points: Number,
});

const Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;

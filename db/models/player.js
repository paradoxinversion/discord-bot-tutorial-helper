const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  discordUserId: { type: String, required: true },
  lastCorrectGuess: { type: String, default: "" },
  points: { type: Number, default: 0 },
});

const Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;

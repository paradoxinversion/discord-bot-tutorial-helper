const Player = require("../models/player");

const registerPlayer = async (user) => {
  try {
    if (await Player.findOne({ discordUserId: user.id })) {
      throw new Error("A user with that Discord ID already exists.");
    }

    const newPlayer = new Player({
      discordUserId: user.id,
    });
    await newPlayer.save();
    return { result: true };
  } catch (e) {
    return {
      result: false,
      error: e.message,
    };
  }
};

module.exports = { registerPlayer };

const Player = require("./db/models/player");

const parseSentence = async (user, message, keyword, points) => {
  const normalizedKeyword = keyword.toLowerCase();
  try {
    const player = await Player.findOne({ discordUserId: user.id });
    if (!player) {
      throw new Error("User not registered");
    }
    if (
      message.includes(normalizedKeyword) &&
      player.lastCorrectGuess !== normalizedKeyword
    ) {
      player.points += points;
      player.lastCorrectGuess = normalizedKeyword.toLowerCase();
      await player.save();
      return { result: true, points };
    } else {
      return {
        result: false,
        message: "Player has already gotten points for this keyword",
      };
    }
  } catch (e) {
    return {
      result: false,
      message: e.message,
    };
  }
};

module.exports = {
  parseSentence,
};

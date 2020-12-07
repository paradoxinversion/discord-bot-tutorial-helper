const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const gameActions = require("../gameActions");
const Player = require("../db/models/player");
const setupDB = require("../db/client");

describe("gameActions", function () {
  before(function (done) {
    const db = setupDB(true);
    db.once("open", function () {
      const testPlayer = new Player({
        discordUserId: "testUser1",
      });
      testPlayer.save(function (err) {
        if (err) console.log(err);

        done();
      });
    });
  });

  describe("parseSentence", function () {
    it("Should grant points for sentences containing words", async function () {
      const parseResult = await gameActions.parseSentence(
        { id: "testUser1" },
        "I am so cool",
        "Cool",
        10
      );
      const player = await Player.findOne({ discordUserId: "testUser1" });
      expect(parseResult.result).to.eql(true);
      expect(player.points).to.eql(10);
      expect(player.lastCorrectGuess).to.eql("cool");
    });

    it("Should also grant points for keywords with attached punctuation or special characters", async function () {
      const parseResult = await gameActions.parseSentence(
        { id: "testUser1" },
        "I am so awesome!",
        "awesome",
        10
      );
      const player = await Player.findOne({ discordUserId: "testUser1" });
      expect(parseResult.result).to.eql(true);
      expect(player.points).to.eql(20);
      expect(player.lastCorrectGuess).to.eql("awesome");
      console.log(player);
    });

    it("Should not grant multiple 'wins' on the same keyword.", async function () {
      const parseResult1 = await gameActions.parseSentence(
        { id: "testUser1" },
        "I am so great!",
        "great",
        10
      );

      const parseResult2 = await gameActions.parseSentence(
        { id: "testUser1" },
        "great",
        "great",
        10
      );
      expect(parseResult1.result).to.eql(true);
      expect(parseResult2.result).to.eql(false);
    });
    it("Should not crash if an unregistered user posts to chat", async function () {
      const parseResult = await gameActions.parseSentence(
        { id: "unregisteredUser" },
        "I am so cool",
        "Cool",
        10
      );
      expect(parseResult.result).to.eql(false);
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});

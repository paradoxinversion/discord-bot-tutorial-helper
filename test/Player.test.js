const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const playerActions = require("../db/actions/player");
const Player = require("../db/models/player");
const setupDB = require("../db/client");

describe("UserActions", function () {
  before(function (done) {
    const db = setupDB(true);
    db.once("open", function () {
      done();
    });
  });

  describe("registerPlayer", function () {
    beforeEach(async function () {
      await mongoose.connection.dropDatabase();
    });
    it("Should register a user", async function () {
      const testUserData = {
        id: "testId1",
      };

      const registrationResponse = await playerActions.registerPlayer(
        testUserData
      );
      expect(registrationResponse.result).to.equal(true);
    });
  });
});

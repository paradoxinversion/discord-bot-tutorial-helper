const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const playerActions = require("../db/actions/player");
const setupDB = require("../db/client");

describe("UserActions", function () {
  before(function (done) {
    const db = setupDB(true);
    db.once("open", function () {
      done();
    });
  });

  describe("registerPlayer", function () {
    it("Should register a user", async function () {
      const testUserData = {
        id: "testId1",
      };
      const registrationResponse = await playerActions.registerPlayer(
        testUserData
      );
      expect(registrationResponse.result).to.equal(true);
    });

    it("Should fail if a user tries to register twice", async function () {
      const testUserData = {
        id: "testId1",
      };

      const registrationResponse = await playerActions.registerPlayer(
        testUserData
      );
      expect(registrationResponse.result).to.equal(false);
      expect(registrationResponse.error).to.equal(
        "A user with that Discord ID already exists."
      );
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});

const mongoose = require("mongoose");

const setup = (test) => {
  mongoose.connect(
    `mongodb://localhost/${
      test ? "keword-challenge-test" : "keyword-challenge"
    }`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  return db;
};

module.exports = setup;

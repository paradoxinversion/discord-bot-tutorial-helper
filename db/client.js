const mongoose = require("mongoose");

const setup = () => {
  mongoose.connect("mongodb://localhost/keyword-challenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
};

module.exports = setup;

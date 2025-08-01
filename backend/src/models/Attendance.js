const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ["ENTRY", "EXIT"] },
});

module.exports = mongoose.model("Attendance", schema);

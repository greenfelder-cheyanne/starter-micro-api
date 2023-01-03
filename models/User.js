const mongoose = require("mongoose");
// const mongoose = require("../db/dbConnection");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  imei: {
    type: String,
  },

  isGroup: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  profilePic: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  blockedUsers: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
//TODO in v2 add ipaddress to secure jwt stiling attack

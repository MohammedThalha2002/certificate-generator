const mongoose = require("mongoose");

const UserScahema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", UserScahema);

module.exports = UserModel;

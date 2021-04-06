const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  nickName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
  },
});

const User = model("user", UserSchema);
module.exports = { User };

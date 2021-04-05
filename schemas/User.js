const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  id: {
    type: String.apply,
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

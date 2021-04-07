const { Schema, model, Types } = require("mongoose");

const UserHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  menu: {
    type: Types.ObjectId,
    required: true,
    ref: "menu",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
  },
  cup_option: {
    type: String,
  },
  num: {
    type: Number,
  },
});

const UserHistory = model("userhistory", UserHistorySchema);
module.exports = { UserHistory };

const { Schema, model, Types } = require("mongoose");

const UserHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  menu: {
    type: Types.ObjectId,
    required: true,
    ref: "Menu",
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

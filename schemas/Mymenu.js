const { Schema, model, Types } = require("mongoose");

const MymenuSchema = new Schema({
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
  size: {
    type: String,
    required: true,
  },
  cup_option: {
    type: String,
    required: true,
  },
});

const Mymenu = model("mymenu", MymenuSchema);
module.exports = { Mymenu };

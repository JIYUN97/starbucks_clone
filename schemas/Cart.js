const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema({
  userId: {
    type: String,
    requried: true,
  },
  menu: {
    type: Types.ObjectId,
    required: true,
    ref: "menu",
  },
  num: {
    type: Number,
    required: true,
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

const Cart = model("cart", CartSchema);
module.exports = { Cart };

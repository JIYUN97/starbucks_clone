const { Schema, model, Types } = require("mongoose");

const MenuSchema = new Schema({
  menu: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  eng_name: {
    type: String,
    required: true,
  },
  eng_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  eng_category: {
    type: String,
    required: true,
  },
  nutrition: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  allergy: {
    type: String,
    required: true,
  },
  hot: {
    type: Boolean,
    required: true,
  },
  ice: {
    type: Boolean,
    required: true,
  },
});

const Menu = model("menu", MenuSchema);
module.exports = { Menu };

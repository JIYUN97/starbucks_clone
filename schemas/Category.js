const { Schema, model, Types } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  eng_name: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
});

const Category = model("category", CategorySchema);
module.exports = { Category };

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
<<<<<<< HEAD
  imgage: {
=======
  image: {
>>>>>>> 49cdd37923bfd56f2b8138de190ccb0e528e099d
    type: String,
    required: true,
  },
});

const Category = model("category", CategorySchema);
module.exports = { Category };

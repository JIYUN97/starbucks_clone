const express = require("express");
const menuRouter = express.Router();
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");

menuRouter.get("/", async (req, res) => {
  try {
    let result = await Category.find({});
    return res.send({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

//지금 카테고리를 따로 나눠야 할 것 같아서 post 요청 보낼려고 임시로 만든 Router
menuRouter.post("/", async (req, res) => {
  const category = new Category({ ...req.body });
  await category.save();
  res.send("성공");
});

module.exports = {
  menuRouter,
};

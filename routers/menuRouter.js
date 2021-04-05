const express = require("express");
const menuRouter = express.Router();
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");

//전체메뉴에서 음료 api
menuRouter.get("/drink", async (req, res) => {
  try {
    let result = await Category.find({});
    return res.send({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

//카테고리별 페이지 api
menuRouter.get("/drink/categories/:categoryId", async (req, res) => {
  try {
    let { categoryId } = req.params;
    let category = await Category.findOne({ _id: categoryId });
    let category_name = category.eng_name;
    let result = await Menu.find({ eng_category: category_name });
    return res.send({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

//음료별 페이지 api
menuRouter.get("/drink/:menuId", async (req, res) => {
  try {
    let { menuId } = req.params;
    let result = await Menu.findOne({ _id: menuId });
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

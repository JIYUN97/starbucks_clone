const express = require("express");
const menuRouter = express.Router();
const jwt = require("jsonwebtoken");
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");
const { Mymenu } = require("../schemas/Mymenu");
const { UserHistory } = require("../schemas/UserHistory");
const { User } = require("../schemas/User");
const authMiddleware = require("../middlewares/auth-middleware");
const { Cart } = require("../schemas/Cart");

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

//새로나온 메뉴
menuRouter.get("/new_menu", async (req, res) => {
  try {
    let result = await Menu.find({ category: "2021 CherryBlossom" });
    return res.send({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

// 인기메뉴
menuRouter.get("/popular_menu", async (req, res) => {
  try {
    let popular_menu = await UserHistory.find({})
      .populate("menu", "name image")
      .sort("-date")
      .select("menu")
      .limit(5);
    res.send({ result: popular_menu });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//나만의 메뉴
menuRouter.post("/mymenu", authMiddleware, async (req, res) => {
  const userId = res.locals.user;
  const { menuId, size, cup_option } = req.body;

  try {
    const [user, menu] = await Promise.all([
      User.findOne({ id: userId }),
      Menu.findById(menuId),
    ]);

    Mymenu.create({ user, menu, size, cup_option });
    return res.send({ result: "나만의 메뉴 저장에 성공했습니다!" });
  } catch (err) {
    return res.status(400).send({ err: "나만의 메뉴 저장에 실패했습니다." });
  }
});

//나만의 메뉴
menuRouter.get("/mymenu", authMiddleware, async (req, res) => {
  const userId = res.locals.user;

  try {
    const user = await User.findOne({ id: userId });
    const mymenu = await Mymenu.find({ user })
      .populate("menu", "name eng_name ice hot image price")
      .select("menu size cup_option");

    return res.status(200).send({ result: mymenu });
  } catch (err) {
    return res
      .status(400)
      .send({ err: "나만의 메뉴 불러오기에 실패했습니다." });
  }
});

//카트 넣기
menuRouter.post("/:menuId/cart", authMiddleware, async (req, res) => {
  const userId = res.locals.user;
  const { menuId } = req.params;
  try {
    const menu = await Menu.findOne({ _id: menuId });
    const isCart = await Cart.findOne().and([{ userId }, { menu }]);
    if (!isCart) {
      const newCart = new Cart({ userId, menu, ...req.body });
      await newCart.save();
      return res.send({ result: "success" });
    }
    await Cart.findOneAndUpdate(
      { userId, menu },
      { $set: { num: req.body.num } }
    );
    return res.send({ result: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

//카트 목록 불러오기
menuRouter.get("/cart", authMiddleware, async (req, res) => {
  const userId = res.locals.user;
  try {
    const carts = await Cart.find({ userId }).populate({ path: "menu" });
    return res.send({ result: carts });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = {
  menuRouter,
};

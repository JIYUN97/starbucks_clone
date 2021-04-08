const express = require("express");
const orderRouter = express.Router();
const jwt = require("jsonwebtoken");
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");
const { Mymenu } = require("../schemas/Mymenu");
const { UserHistory } = require("../schemas/UserHistory");
const { User } = require("../schemas/User");

//바로 주문
orderRouter.post("/", async (req, res) => {
  const userId = res.locals.user;
  const { menuId, size, cup_option, num } = req.body;
  try {
    const [user, menu] = await Promise.all([
      User.findOneAndUpdate(
        { id: userId },
        { $inc: { star: 1 } },
        { new: true }
      ),
      Menu.findById(menuId),
    ]);
    const newHistory = new UserHistory({ user, menu, size, cup_option, num });
    await newHistory.save();

    return res.send({ result: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

//히스토리 주문내역
orderRouter.get("/", async (req, res) => {
  try {
    const userId = res.locals.user;
    const user = await User.find({ id: userId });
    if (!user)
      return res
        .status(400)
        .send({ err: "해당 유저 정보가 존재하지 않습니다." });
    const orderList = await UserHistory.find({ user: user })
      .sort("-date")
      .populate({ path: "menu" });
    return res.send({ result: orderList });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = {
  orderRouter,
};

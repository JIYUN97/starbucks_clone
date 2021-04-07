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
      User.findOne({ id: userId }),
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

module.exports = {
  orderRouter,
};

// const express = require("express");
// const menuRouter = express.Router();
// const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");

console.log(Menu.find({category: "2021 CherryBlossom"}));
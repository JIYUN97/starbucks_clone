const express = require("express");
const orderRouter = express.Router();
const jwt = require("jsonwebtoken");
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");
const { Mymenu } = require("../schemas/Mymenu");
const { UserHistory } = require("../schemas/UserHistory");
const { User } = require("../schemas/User");

// 주문하기 > 결제페이지
orderRouter.post("/",async(req,res)=>{
    const{user,}= req.body;
});


module.exports = {
    orderRouter,
};

const express = require("express");
const menuRouter = express.Router();
const jwt = require("jsonwebtoken");
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");
const { Mymenu } = require("../schemas/Mymenu");
const { UserHistory } = require("../schemas/UserHistory");
const { User } = require("../schemas/User");

//회원가입, 서버에서 비밀번호 - 비밀번호 확인까지 해주는 버전
menuRouter.get("/signin", async (req, res) => {
    const { nickname,id, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        });
        return;
    }

    const existUsers = await User.find({$or: [{ id }]});
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: "이미 가입된 아이디가 있습니다.",
        });
        return;
    }
    User.create({ nickname, id, password });
    res.status(201).send({});
});

//회원가입, 프론트에서 비밀번호 - 비밀번호 확인까지 하고 넘어오는
menuRouter.get("/signin", async (req, res) => {
    const { nickname, id,password } = req.body;
    User.create({ nickname, id, password });
    res.status(201).send({});
});

// 인기메뉴


menuRouter.get("/popular_menu", async (req, res) => {
    try {
      let result = await UserHistory.find({});
      return res.send({ result });
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
});


// 임의 API
menuRouter.get("/tt",async(req,res)=>{
    const {ordernum,user,menu_name,menu_price,image} =req.body;
    console.log("넣어진듯?")
    UserHistory.create({ordernum,user,menu_name,menu_price,image});
    res.send({mss:"dddddd"})
  })
  
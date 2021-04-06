const express = require("express");
const { Category } = require("../schemas/Category");
const { Menu } = require("../schemas/Menu");
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
  
  //로그인


  
module.exports = {
    userRouter,
  };
  
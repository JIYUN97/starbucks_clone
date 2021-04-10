const express = require("express");
const userRouter = express.Router();
const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
require("dotenv").config();

//회원가입, 서버에서 비밀번호 - 비밀번호 확인까지 해주는 버전
userRouter.post("/register", async (req, res) => {
  const { nickName, id, password } = req.body;
  try {
    if (!nickName || !id || !password) {
      return res
        .status(400)
        .send({ err: "아이디, 패스워드, 닉네임 중 빈 항목이 있습니다." });
    }
    const existUsers = await User.find({ $or: [{ id }] });
    if (existUsers.length) {
      res.status(400).send({
        err: "이미 가입된 아이디가 있습니다.",
      });
      return;
    }
    User.create({ nickName, id, password });
    return res.status(201).send({ result: "success" });
  } catch (err) {
    return res.status(400).send({ err: "회원가입에 실패했습니다." });
  }
});

//로그인 JWT 토큰 이용
userRouter.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne().and([{ id }, { password }]);
    if (!user) {
      return res
        .status(400)
        .send({ err: "아이디 또는 패스워드가 잘못됐습니다." });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETKEY);
    return res.send({ result: { user: { token: token } } });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

// 메인페이지에서 유저정보 뿌려주기
// 프론트단에서는 if문으로 토큰이 있으면 이 함수를 실행 없으면 실행X
userRouter.get("/user_info", authMiddleware, async (req, res) => {
  const userId = res.locals.user;
  try {
    const user = await User.findOne({ id: userId });
    res.send({
      result: { userId: user.id, nickName: user.nickName, star: user.star },
    });
  } catch (err) {
    return res.send(400).send({ err: err.message });
  }
});
module.exports = {
  userRouter,
};

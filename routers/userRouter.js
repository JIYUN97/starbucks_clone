const express = require("express");
const userRouter = express.Router();
const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");

//회원가입, 서버에서 비밀번호 - 비밀번호 확인까지 해주는 버전
userRouter.post("/register", async (req, res) => {
  const { nickName, id, password } = req.body;
  const existUsers = await User.find({ $or: [{ id }] });
  if (existUsers.length) {
    res.status(400).send({
      errorMessage: "이미 가입된 아이디가 있습니다.",
    });
    return;
  }
  User.create({ nickName, id, password });
  res.status(201).send({ result: "success" });
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
    const token = jwt.sign({ userId: user.id }, "starbucks_clone_key");
    return res.send({ result: { user: { token: token } } });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};

const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    return res.status(400).send({
      err: "로그인 후 이용 가능한 기능입니다.",
    });
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRETKEY);
    User.findOne({ id: userId }).then((user) => {
      res.locals.user = user.id;
      next();
    });
  } catch (err) {
    res.status(400).send({
      err: "사용자 정보를 찾을 수 없습니다.",
    });
  }
};

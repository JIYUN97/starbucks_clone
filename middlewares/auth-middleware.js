const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(400).send({
      err: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, "starbucks_clone_key");
    User.findOne({ id: userId }).then((user) => {
      res.locals.user = userId;
      next();
    });
  } catch (err) {
    res.status(400).send({
      err: "사용자 정보를 찾을 수 없습니다.",
    });
  }
};

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { menuRouter, userRouter, orderRouter } = require("./routers");
const authMiddleware = require("./middlewares/auth-middleware");
require("dotenv").config();

const server = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/starbucks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      useFindAndModify: false,
      // user: process.env.USER,
      // pass: process.env.PASSWORD,
    });

    app.use(express.json());
    app.use("/menu", authMiddleware, [menuRouter]);
    app.use("/user", [userRouter]);
    app.use("/order", authMiddleware, [orderRouter]);

    app.listen(port, () => {
      console.log("server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

server();

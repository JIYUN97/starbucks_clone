const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const { menuRouter } = require("./routers/menuRouter");

const server = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/starbucks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      useFindAndModify: false,
    });

    app.use(cors()); //cors를 위한 미들웨어
    app.use(express.json());
    app.use("/menu", [menuRouter]);

    app.listen(port, () => {
      console.log("server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

server();

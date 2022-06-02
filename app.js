// 整个项目入口文件
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/index");
// 托管静态资源文件
app.use("/files", express.static("./files"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

// 错误中间件
app.use(function (err, req, res, next) {
  console.log(err);
  res.send({ status: "500", message: err });
});

app.listen(3000, () => {
  console.log("express start at http://127.0.0.1:3000");
});

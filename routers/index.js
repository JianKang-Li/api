const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res, next) => {
  res.status(200).send(`
  Please use this api like:<br>
  get for Info: "/api/getInfo?db=Param"<br>
  post for test:"/api/text"
  `)
})

router.post("/", (req, res, next) => {
  res.status(200).send(`
  Please use this api like:<br>
  get for Info: "/api/getInfo?db=Param"<br>
  post for test:"/api/text"
  `)
})


function getTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return `${h}:${m}:${s}`
}


function getPath(name) {
  return `./files/${name}.json`
}
// 获取指定json文件全部数据
router.get("/getInfo", (req, res, next) => {
  try {
    let name = req.query.db;
    // console.log(req.query.name);
    let time = getTime()
    if (name) {
      let path = getPath(name);
      // console.log(path);
      let isex = fs.existsSync(path);
      // console.log(isex);
      if (isex) {
        fs.readFile(path, (err, data) => {
          if (err) next(err);
          // console.log(data);
          res.setHeader("Content-Type", "text/json;charset=UTF-8");
          res.status(200).send({
            status: 200,
            data: JSON.parse(data)
          });
          console.log(`GET ${req.query.db} 200 ${time}`);
        });
      } else {
        res.send("No files like " + req.query.db + ".json");
        console.log(`GET ${req.query.db} 404 ${h}:${m}:${s}`);
      }
    } else {
      res.send("Please use http://127.0.0.1:3000/api?db=Params");
      console.log(`GET ${req.query.db} 404 ${time}`);
    }
  } catch (e) {
    next(e)
  }
});

// post请求获取数据的接口
router.post("/test", (req, res, next) => {
  let time = getTime()
  let query = JSON.stringify(req.query)
  let object = JSON.stringify(req.body);
  console.log(
    `POST /api/test 200 ${time}`
  );
  object = JSON.parse(object)
  Object.assign(object, JSON.parse(query))
  res.setHeader("Content-Type", "text/json")
  res.send({
    status: "200",
    message: object
  });
});


module.exports = router;

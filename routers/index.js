const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res, next) => {
  let name = req.query.db;
  // console.log(req.query.name);
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if (name != undefined) {
    let path = "./files/" + name + ".json";
    // console.log(path);
    let isex = fs.existsSync(path);
    // console.log(isex);
    if (isex) {
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.setHeader("Content-Type", "text/json;charset=UTF-8");
        res.send(JSON.parse(data));
        console.log(`GET ${req.query.db} 200 ${h}:${m}:${s}`);
      });
    } else {
      res.send("No files like " + req.query.db + ".json");
      console.log(`GET ${req.query.db} 404 ${h}:${m}:${s}`);
    }
  } else {
    res.send("Please use http://127.0.0.1:3000/api?db=Params");
    console.log(`GET ${req.query.db} 404 ${h}:${m}:${s}`);
  }
});

router.post("/", (req, res, next) => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  console.log(`POST ${req.query.db} 200 ${h}:${m}:${s}`);
  let name = req.query.db;
  let object = JSON.stringify(req.body);
  console.log(object);
  let message = req.body;
  res.send({ status: "200", path: name, message });
});

module.exports = router;

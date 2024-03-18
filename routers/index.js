const express = require("express")
const router = express.Router()
const fs = require("fs")

function getTime() {
  const date = new Date()
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  return `'${y}-${M}-${d} ${h}:${m}:${s}'`
}

function getPath(name) {
  return `./files/${name}.json`
}
// 获取指定json文件全部数据
router.get("/", (req, res, next) => {
  try {
    const name = req.query.db
    const time = getTime()
    if (name) {
      const path = getPath(name)
      const isex = fs.existsSync(path)
      if (isex) {
        fs.readFile(path, (err, data) => {
          if (err) next(err)
          res.setHeader("Content-Type", "text/json;charset=UTF-8")
          res.status(200).send({
            status: 200,
            data: JSON.parse(data)
          })
          console.log(`GET ${req.query.db} 200 ${time}`)
        })
      } else {
        res.status(404).send("No files like " + req.query.db + ".json")
        console.log(`GET ${req.query.db} 404 ${h}:${m}:${s}`)
      }
    } else {
      res.send("Please use http://127.0.0.1:3000/api?db=Params")
      console.log(`GET ${req.query.db} 404 ${time}`)
    }
  } catch (e) {
    next(e)
  }
})

// post请求获取数据的接口
router.post("/", (req, res, next) => {
  const time = getTime()
  const query = JSON.stringify(req.query)
  const expect = eval('(' + req.body.expect + ')')

  console.log(
    `POST /api 200 ${time} ${query}`
  )
  const content = expect
  res.setHeader("Content-Type", "text/json")
  res.send(content)
})

module.exports = router

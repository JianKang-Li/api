const express = require("express")
const router = express.Router()
const fs = require("fs")
const Config = require('../config')
const Util = require('../utils/util')

function getTime() {
  const date = new Date()
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  return `'${y}-${M.toFixed(2)}-${d} ${h}:${m}:${s}'`
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
      const isExist = fs.existsSync(path)
      if (isExist) {
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
      res.send("Please use /api?db=Params")
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
  let expect =null
  if (typeof req.body.expect === 'string') {
    expect = eval('(' + req.body.expect + ')')
  } else {
    expect = req.body.expect
  }
  const delayTime = parseInt(req.body.delay) || 0

  console.log(
    `POST /api 200 ${time} ${query}`
  )
  const content = expect
  Util.delay(delayTime,() => {
    res.json(content)
    next()
  })
})

// Delete
router.delete('/', (req,res,next) => {
  const time = getTime()
  const query = JSON.stringify(req.query)
  const expect = eval('(' + req.body.expect + ')')

  console.log(
    `Delete /api 200 ${time} ${query}`
  )
  const content = expect
  const delayTime = parseInt(req.body.delay) || 0

  Util.delay(delayTime,() => {
    res.setHeader("Content-Type", "text/json")
    res.send(content)
    next()
  })
})

module.exports = router

const express = require("express")
const router = express.Router()
const fs = require("fs")
const Config = require('../config')
const Util = require('../utils/util')

function getTime() {
  const date = new Date()
  const y = Util.DateTimeFormat(date.getFullYear(), 4, '0')
  const M = Util.DateTimeFormat(date.getMonth() + 1, 2, '0')
  const d = Util.DateTimeFormat(date.getDate(), 2, '0')
  let h = Util.DateTimeFormat(date.getHours(), 2, '0')
  let m = Util.DateTimeFormat(date.getMinutes(), 2, '0')
  let s = Util.DateTimeFormat(date.getSeconds(), 2, '0')
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
        res.status(404).send("No such files name " + req.query.db + ".json")
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

// 处理 POST、PUT 等有请求体的请求
function ResolveBodyReq(req, res, next, type) {
  const time = getTime()
  const query = JSON.stringify(req.query)
  const body = req.body
  const expect = body.expect || {}
  const code = body.status || 200
  const delayTime = parseInt(body.delay) || 0

  console.log(
    `${type} /api ${code} ${time} ${query}`
  )
  Util.delay(delayTime, () => {
    res.status(code).json(expect)
    next()
  })
}

// 处理 DELETE 等没有请求体的请求
function ResolveReq(req, res, next, type) {
  const query = req.query
  const time = getTime()
  const expect = Util.toJSON(query.expect)
  const code = parseInt(query.status) || 200
  const delayTime = parseInt(query.delay) || 0

  console.log(
    `${type} /api ${code} ${time} ${JSON.stringify(query)}`
  )

  Util.delay(delayTime, () => {
    res.status(code).json(expect)
    next()
  })
}

// POST
router.post("/", (req, res, next) => {
  ResolveBodyReq(req, res, next, 'POST')
})

// PUT
router.put('/', (req, res, next) => {
  ResolveBodyReq(req, res, next, 'PUT')
})

// DELETE
router.delete('/', (req, res, next) => {
  ResolveReq(req, res, next, 'DELETE')
})

// 超时请求
router.all('/timeout', (req, res, next) => {
  const time = getTime()
  const query = req.query
  const delayTime = parseInt(query.delay) || 0

  console.log(
    `${req.method} /timeout 504 ${time} ${JSON.stringify(query)}`
  )

  Util.delay(delayTime, () => {
    res.status(504).send()
    next()
  })
})

router.all('/error', (req, res, next) => {
  const time = getTime()
  const query = req.query
  const delayTime = parseInt(query.delay) || 0
  const code = parseInt(query.code) || 404

  console.log(
    `${req.method} /error ${code} ${time} ${JSON.stringify(query)}`
  )

  Util.delay(delayTime, () => {
    res.status(code).send()
    next()
  })
})

module.exports = router

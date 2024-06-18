// 整个项目入口文件
const express = require("express")
const app = express()
const cors = require("cors")
const router = require("../routers/index")
const getIPAddress = require("../utils/ip")
const Config = require('../config')
const path = require('path')
const Util = require('../utils/util')
// 托管静态资源文件
app.use("/files", express.static("../files"))
app.use("/public", express.static('../public'))
// 使用插件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 自定义图标

app.get('/public/favicon.ico', (req,res,next)=> {
  res.sendFile(path.join(__dirname, '../public/favicon.ico'))
})

app.get('/', function (req, res, next) {
  const query = JSON.stringify(req.query)

  console.log(
    `${req.method} /index.html 200 ${Util.getTime()} ${JSON.stringify(query)}`
  )
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

//加载路由
app.use("/api", router)

// 错误中间件
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500).send({ status: "500", message: err })
})

const ip = getIPAddress()

app.listen(Config.port, () => {
  console.log('\x1B[32m%s\x1B[0m', `Welcome to use this project\nexpress start at http://${ip}:${Config.port}/api`)
})

module.exports = app

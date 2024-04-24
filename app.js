// 整个项目入口文件
const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./routers/index")
const getIPAddress = require("./utils/ip")
const Config = require('./config')
// 托管静态资源文件
app.use("/files", express.static("./files"))
// 使用插件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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

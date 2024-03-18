// 整个项目入口文件
const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./routers/index")
const getIPAddress = require("./utils/ip")
// 托管静态资源文件
app.use("/files", express.static("./files"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//加载路由
app.use("/api", router)

// 错误中间件
app.use(function (err, req, res, next) {
  console.log(err)
  res.send({ status: "500", message: err })
})

const ip = getIPAddress()
const port = '3000'

app.listen(port, () => {
  console.log(`Welecome to use this project\nexpress start at ${ip}:${port}/api
  `)
})

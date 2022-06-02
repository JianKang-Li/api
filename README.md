# api
帮助你快速搭建简单后台接口

## 使用方法
`git clone https://github.com/imeuser/api.git`

`npm install`

`npm run dev`

然后你就可以向接口发送请求了！

## 使用指南

Get请求

（1）在files文件夹中加入你需要数据的json文件

（2）然后通过请求`http:127.0.0.1:3000/api?db=`+你想访问的文件名

Post请求

使用方法与get相同，可以添加body，params

返回值为{

  status:String,

  path:String,

  message: json

}

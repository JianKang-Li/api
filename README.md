# api

帮助你快速请求数据，利用nodejs实现简单数据请求功能，让你有数据可以用

## 使用方法

`git clone https://github.com/imeuser/api.git`

`npm install`

`npm run dev`

然后你就可以向接口发送请求了！

## 使用指南

Get请求

（1）在files文件夹中加入你需要数据的json文件

（2）然后通过请求`http:127.0.0.1:3000/api/getInfo?db=`+你想访问的文件名(不含json后缀)

Post请求

使用方法`http:127.0.0.1:3000/api/text`

**可以添加请求参数，但请求参数会和body合并返回，避免覆盖**

返回值为

```json
{
    status
    message
}
```

版本号：v0.0.2

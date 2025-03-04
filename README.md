# api

帮助你快速请求数据，利用nodejs实现简单数据请求功能，让你有数据可以用

## 使用方法

`git clone https://github.com/JianKang-Li/api.git`

`npm install`

`npm run dev`

然后你就可以向接口发送请求了！

## 使用指南
### /api

Get请求

  (1)在files文件夹中加入你需要数据的json文件

  (2) 然后通过请求`http:127.0.0.1:3000/api?db=`+你想访问的文件名(不含json后缀)

  (3) 使用 expect 参数
  ```js
    params:{
      expect: encodeURIComponent(JSON.stringify({ code: 200, data: ['123'] }))
    }
  ```

  (4) 如果不加`db`参数默认返回空对象

Post请求

使用方法`http:127.0.0.1:3000/api`
```js
// 可以使用自定义参数进行返回自定义
{
  expect: { // 想要返回的数据信息（默认空对象）
  },
  status: 200, // 返回的状态码（默认200）
  delay: 300, // 延时返回请求时间（默认0）
}
```
### /api/timeout
超时请求

```js
params: {
  delay: 2000, // 请求延时返回时间（默认0）
}
```

### /api/error
自定义错误请求模拟
```js
params: {
  delay: 2000, // 请求延时返回时间（默认0）
  code: 404 // 请求返回状态码（默认404）
}
```

## 备注
版本号：v1.0.1

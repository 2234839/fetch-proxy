# fetch-proxy

用于代理浏览器发起的请求来避免跨域问题

## 使用方式

自用服务，如有同样的需求***请自行另建服务***，请勿白嫖下面的函数计算。(或者[赞助后使用](https://afdian.net/@llej0))

```js
fetch(`${"https" || "http"}://fetchproxy.shenzilong.cn/`, {
  method: "POST",
  /** 此处参数参见 node-fetch { url: RequestInfo; init?: RequestInit } */
  body: JSON.stringify({
    url: "https://zhihu.com",
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
// CORS
fetch(`https://zhihu.com`)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

github 网站设置了 CSP 可以去[我的网站尝试上面的脚本](https://shenzilong.cn)

## 开发说明

```bash
pnpm i
pnpm run start
```

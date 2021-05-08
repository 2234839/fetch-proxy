# fetch-proxy

用于代理浏览器发起的请求来避免跨域问题

## 使用方式

**自用服务，如有同样的需求请自行另建服务，请勿白嫖下面的函数计算。(或者赞助后使用)**

```js
fetch(`${"https" || "http"}://fetchproxy.shenzilong.cn/`, {
  method: "POST",
  /** 此处参数参见 node-fetch { url: RequestInfo; init?: RequestInit } */
  body: JSON.stringify({
    url: "https://zhihu.com",
  }),
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

## 开发说明

```bash
pnpm i
pnpm run start
```

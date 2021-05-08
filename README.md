# fetch-proxy

这个项目分为两部分：fetch-proxy service, fetch-proxy lib

- fetch-proxy service
  - 提供一个 api 用于代理浏览器发起的请求来避免跨域问题
- fetch-proxy lib
  - 和 原生fetch 使用方式一样的函数 (npm package)
  - 内部主要逻辑如下
    - if (请求目标和当前网页是同一个域): 直接使用原生 fetch
    - else (处于油猴脚本的执行环境下): 使用 GM.xmlHttpRequest
    - else : 通过原生 fetch 调用 fetch-proxy service

## fetch-proxy service 的使用方式

自用服务，如有同样的需求***请自行另建服务***，请勿白嫖下面的函数计算。(或者[赞助后使用](https://afdian.net/@llej0))

```js
fetch(`${"https" || "http"}://fetchproxy.shenzilong.cn`, {
  method: "POST",
  /** 此处参数参见 node-fetch { input: RequestInfo; init?: RequestInit } */
  body: JSON.stringify({
    input: "https://zhihu.com",
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
// 在非知乎站点请求知乎网页会触发跨域
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
- https
  - 在 https 的站点只能获取其他 https 站点的数据、
  - 部署的时候需要替换掉 ssl 目录下的证书 key 和 pem 文件 (pem 文件是私密的，没有上传到 github)

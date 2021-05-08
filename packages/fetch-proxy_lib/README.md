[中文文档](#chinese-documents)
[See development details](https://github.com/2234839/fetch-proxy)

## Overview

- The fetch-proxy lib is a library for cross-domain requests
  - function in the same way as native fetch (npm package)
  - The main internal logic is as follows
    - if (the request target is in the same domain as the current page): use native fetch directly
    - else (in the context of a Grease Monkey script): use GM.xmlHttpRequest
    - else : call [fetch-proxy service](https://github.com/2234839/fetch-proxy/packages/fetch-proxy_service) via native fetch

## How to use the fetch-proxy lib

The github site has a CSP set up you can try the following script at [my site](https://shenzilong.cn)

```js
import { fetch_proxy } from "fetch-proxy_lib";

fetch_proxy(`https://zhihu.com`)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

----
<h2 id="chinese-documents">中文文档</h2>

[开发详情参见](https://github.com/2234839/fetch-proxy)

## 概述

- fetch-proxy lib 是一个用于跨域请求的库
  - 和 原生fetch 使用方式一样的函数 (npm package)
  - 内部主要逻辑如下
    - if (请求目标和当前网页是同一个域): 直接使用原生 fetch
    - else (处于油猴脚本的执行环境下): 使用 GM.xmlHttpRequest
    - else : 通过原生 fetch 调用 [fetch-proxy service](https://github.com/2234839/fetch-proxy/packages/fetch-proxy_service)

## fetch-proxy lib 的使用方式

github 网站设置了 CSP 可以去[我的网站尝试下面的脚本](https://shenzilong.cn)

```js
import { fetch_proxy } from "fetch-proxy_lib";

fetch_proxy(`https://zhihu.com`)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```
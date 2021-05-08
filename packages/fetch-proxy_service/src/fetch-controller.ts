import { Controller, Post, Get, Body } from "@malagu/mvc/lib/node";
import nodeFetch from "node-fetch";
import type { RequestInfo, RequestInit } from "node-fetch";

@Controller()
export class fetchController {
  @Get()
  a() {
    return "崮生 -> https://shenzilong.cn ";
  }
  @Post()
  async fetch(@Body() p: { url: RequestInfo; init?: RequestInit }) {
    const { url, init } = p;
    const r = await nodeFetch(url, init);

    const { status, statusText } = r;
    const headers = r.headers.raw();
    return { headers, status, statusText, BodyInit: await r.text() };
  }
}

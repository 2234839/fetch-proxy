import { Controller, Post, Get, Body } from "@malagu/mvc/lib/node";
import nodeFetch from "node-fetch";
import type { RequestInfo, RequestInit } from "node-fetch";

@Controller()
export class fetchController {
  @Get()
  a() {
    return 1;
  }
  @Post()
  async fetch(@Body() p: { url: RequestInfo; init?: RequestInit }) {
    const { url, init } = p;
    const r = await nodeFetch(url, init);
    return r.text()
  }
}

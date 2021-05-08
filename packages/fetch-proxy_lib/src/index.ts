declare var GM: any;
//@ts-ignore
import parseHeaders from "parse-headers";
export async function fetch_proxy(
  input: RequestInfo,
  init: RequestInit = {
    method: "GET",
  },
): Promise<Response> {
  const targetUrl = typeof input === "string" ? input : input.url;

  if (targetUrl.startsWith(location.protocol + "//" + location.hostname)) {
    return fetch(input, init);
  } else if ("GM" in globalThis) {
    return await fetch_proxy.GM_fetch_proxy(input, init);
  } else {
    return await fetch_proxy.remote_fetch_proxy(input, init);
  }
}
export namespace fetch_proxy {
  type config = {
    fetch_proxy_service: string;
  };

  export const config: config = {
    fetch_proxy_service: "https://fetchproxy.shenzilong.cn/",
  };
  type fetch_proxy = (
    input: RequestInfo,
    init: RequestInit,
  ) => Promise<Response>;
  export const GM_fetch_proxy: fetch_proxy = async (input, init) => {
    const targetUrl = typeof input === "string" ? input : input.url;
    const r = await new Promise<any>((resolve, reject) => {
      let headers: Record<string, string> = {};
      if (init.headers instanceof Headers) {
        init.headers.forEach((value, key) => {
          headers[key] = value;
        });
      }
      GM.xmlHttpRequest({
        method: init.method,
        url: targetUrl,
        binary: init.body instanceof Blob || init.body instanceof ArrayBuffer,
        data: init.body,
        headers,
        onload: function (response: any) {
          const { status, statusText } = response;
          const headers = parseHeaders(response.responseHeaders);
          resolve({
            BodyInit: response.responseText,
            headers,
            status,
            statusText,
          });
        },
        onerror: reject,
      });
    });

    return new Response(r.BodyInit, r);
  };
  export const remote_fetch_proxy: fetch_proxy = async (input, init) => {
    const r = await (
      await fetch(fetch_proxy.config.fetch_proxy_service, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          init,
        }),
      })
    ).json();
    return new Response(r.BodyInit, r);
  };
}

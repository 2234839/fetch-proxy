import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
// rollup.config.js
export default {
    // 核心选项
    input: "src/index.ts",     // 必须
    plugins: [
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        typescript({
            sourceMap: true,
            inlineSources: true,
            tsconfig: "./tsconfig.json"
        }),
    ],

    output: [
        {
            format: "umd",
            name: "fetch-proxy_lib",
            file: pkg.browser,
            sourcemap: true
        },
        {
            format: "iife",
            name: "fetch_proxy_lib",
            file: "./lib/bundle.iife.js",
            sourcemap: true
        },
        {
            format: "es",
            file: pkg.module,
            sourcemap: true
        }
    ]


};
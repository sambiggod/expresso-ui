import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
/**
 * node.js 核心方法 url、path
 */
import { resolve } from "path";
import { pkgRoot, outputUmd } from "./common.js"
// umd打包
export const umdBuildEntry = async () => {
  const writeBundles = await rollup({
    input: resolve(pkgRoot, "index.js"),   // 配置打包入口文件
    plugins: [   // 配置插件
      vue(),
      nodeResolve({ extensions: ['.ts'] }),
      esbuild(),
    ],
    external: ["vue"],  // 排除不进行打包的npm包
  });
  
  writeBundles.write({
    format: "umd",
    file: resolve(outputUmd, "index.full.js"),
    name: "AzongUI",
    globals: {
      vue: "Vue",
    },
  })
};
umdBuildEntry()

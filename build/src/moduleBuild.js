import glob from "fast-glob";
import { rollup } from "rollup";
import path from 'path'
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss"
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
/**
 * node.js 核心方法 url、path
 */

import { pkgRoot, outputEsm, outputCjs, outputPkgDir } from "./common.js"
export const moduleBuildEntry = async () => {
  const input = await glob("**/*.{js,ts,vue}", {
    cwd: pkgRoot,
    absolute: true,  // 绝对路径
    onlyFiles: true, // 文件的路径，不需要目录
  })
  const writeBundles = await rollup({
    input,   // 配置打包入口文件
    plugins: [   // 配置插件
      compileStyleEntry(),
      vue(),
      nodeResolve({ extensions: ['.ts'] }),
      esbuild(),
      postcss({
        pextract: true,  // css通过链接引入
      }),
    ],
    external: [ // 排除不进行打包的npm包
      'vue',
      '@vueuse/core',
      'async-validator',
    ],  
  });
  writeBundles.write({
    format: "esm",
    dir: outputEsm,
    preserveModules: true,
    entryFileNames: `[name].mjs`,
    sourcemap: true,
  })
  writeBundles.write({
    format: "cjs",
    dir: outputCjs,
    preserveModules: true,
    entryFileNames: `[name].cjs`,
    sourcemap: true,
  });
};

// 重写@import路径
const compileStyleEntry = () => {
  const themeEntryPrefix = `@expresso-ui/theme/src/`
  return {
    name: 'compile-style-entry',
    resolveId (id) {
      if (!id.startsWith(themeEntryPrefix)) return 
      return {
        id: id.replaceAll(themeEntryPrefix, `${outputPkgDir}/theme/src/`),
        external: 'absolute',
      }
    }
  }
}

moduleBuildEntry()
/**
 * node.js 核心方法 url、path
 */

import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
export const outputPkgDir = 'azong'
export const filePath = fileURLToPath(import.meta.url);
export const dirName = dirname(filePath);
export const rootDir = resolve(dirName, "..", ".."); // 获取UI组件库 “根目录”
export const pkgRoot = resolve(rootDir, "packages"); // 获取UI组件包的目录
console.log('filePath', filePath)
console.log('dirName', dirName)
console.log('rootDir', rootDir)
console.log('pkgRoot', pkgRoot)
// azong
export const outputDir = resolve(rootDir, outputPkgDir)
// es
export const outputEsm = resolve(rootDir, outputPkgDir, "es")
// lib
export const outputCjs = resolve(rootDir, outputPkgDir, "lib")
// dist
export const outputUmd = resolve(rootDir, outputPkgDir, "dist")

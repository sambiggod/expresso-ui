import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const outputPkgDir = 'expresso'

export const filePath = fileURLToPath(import.meta.url)
export const dirName = dirname(filePath)
export const rootDir = resolve(dirName, '..', '..')
export const pkgRoot = resolve(rootDir, 'packages')
export const outputDir = resolve(rootDir, outputPkgDir)
export const outputEsm = resolve(outputDir, 'es')
export const outputCjs = resolve(outputDir, 'lib')
export const outputUmd = resolve(outputDir, 'dist')

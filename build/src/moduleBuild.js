import glob from 'fast-glob'
import { pkgRoot, outputEsm, outputCjs, outputPkgDir } from './common'

// 重写@import
const compileStyleEntry = () => {
    const themeEntryPrefix = '@expresso-ui/theme/src'
    return {
        name: 'compile-style-entry',
        resolveId(id) {
            if (!id.startsWith(themeEntryPrefix)) {
                return
            }
            return {
                id: id.replaceAll(themeEntryPrefix, `${outputPkgDir}/theme/src`),
                external: 'absolute'
            }
        }
    }
}

// UMD打包
export const moduleBuildEntry = async () => {
    const input = await glob('**/*.{js,ts,vue}', {
        cwd: pkgRoot,
        absolute: true,
        onlyFiles: true
    })
    const writeBundles = await rollup({
        input,
        plugins: [
            compileStyleEntry(),
            vue(),
            nodeResolve({
                extensions: ['.ts']
            }),
            esbuild(),
            postcss({
                pextract: true
            })
        ],
        external: [
            'vue',
            '@vue/shared',
            'async-validator',
        ],
    })
    writeBundles.write({
        format: 'esm',
        dir: outputEsm,
        preserveModules: true,
        entryFileNames: `[name].mjs`,
        sourcemap: true
    })
    writeBundles.write({
        format: 'cjs',
        dir: outputCjs,
        preserveModules: true,
        entryFileNames: `[name].cjs`,
        sourcemap: true
    })
}

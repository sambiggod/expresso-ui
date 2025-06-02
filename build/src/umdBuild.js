import rollup from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@rollup/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import { resolve } from 'path'
import { pkgRoot, outputUmd } from './common'

const umdBuildEntry = async () => {
    const writeBundles = await rollup({
        input: resolve(pkgRoot, 'index.js'),
        plugins: [
            vue(),
            nodeResolve({
                extensions: ['.ts']
            }),
            esbuild()
        ],
        external: ['vue'],
    })
    writeBundles.write({
        format: 'umd',
        file: resolve(outputUmd, 'index.full.js'),
        name: 'ExpressoUI',
        globals: {
            vue: 'Vue'
        }
    })
}

umdBuildEntry()
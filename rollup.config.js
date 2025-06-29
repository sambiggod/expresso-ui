import vue from 'rollup-plugin-vue'; // 导入处理Vue单文件组件的插件
import babel from '@rollup/plugin-babel'; // 导入Babel转译器插件
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 导入Node模块解析插件
import commonjs from '@rollup/plugin-commonjs'; // 导入CommonJS模块解析插件
 
export default {
  input: './packages/index.js', // 输入文件路径
  output: [
    {
      file: 'dist/bundle.esm.js', // ES Module格式输出文件路径
      format: 'es'
    },
    {
      file: 'dist/bundle.cjs.js', // CommonJS格式输出文件路径
      format: 'cjs'
    }
  ],
  plugins: [
    vue(), // Vue插件
    babel({ exclude: 'node_modules/**' }), // Babel插件，不对node_modules中的文件进行转译
    nodeResolve(), // Node模块解析插件
    commonjs() // CommonJS模块解析插件
  ]
};
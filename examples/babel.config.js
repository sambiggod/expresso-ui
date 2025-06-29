module.exports = {
  presets: [
    'babel-plugin-import'
  ],
  plugins: [
    ['import', {
      libraryName: 'azong',
      libraryDirectory: 'es',
      style: (name) => {
        console.log('style-->>', name)
        // azong/lib/switch/index.js
        // 注意这里的name为组件所在的路径，按需加载样式配置提取对应组件名称的css即可
        return `azong/es/components/style/${name.split('/')[2]}.css`
      },
    }, 'azong']
  ]
}
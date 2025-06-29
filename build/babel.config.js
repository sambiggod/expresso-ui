module.exports = {
  plugins: [
    ['import', {
      libraryName: 'azong',
      libraryDirectory: 'es',
      "camel2DashComponentName": false, // 是否需要驼峰转短线
      "camel2UnderlineComponentName": false, // 是否需要驼峰转下划线
      customName: (name) => {
        console.log('name', name)
        return `azong/es/components/${name}` // 核心配置 根据你自己的组件目录配置
      },
      style: () => {
        return false
      }
    }]
  ]
};
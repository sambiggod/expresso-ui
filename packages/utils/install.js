/**
 * 按需加载注册组件
 * @param { Object } com 
 */
export const componentInstall = (com) => {
  com.install = (app) => {
    app.component(com.name, com)
  }
  return com
}

/**
 * 函数注册
 */
export const functionInstall = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context
    app.config.globalProperties[name] = fn
  }
  return fn
}
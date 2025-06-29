import Badge from "./src/index.vue"
// 提供按需加载的方式
Badge.install = (app) => {
    app.component(Badge.name, Badge)
}
// 导出组件
export default Badge
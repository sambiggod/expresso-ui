import { getCurrentInstance } from "vue"
// 默认命名前缀
import { defaultNamespace } from "../config"

export const useParent = (parentName) => {
  // 获取父级
  const parent = getCurrentInstance().parent
  // 获取父级组件
  const group = () => {
    return parent.proxy.$options.name === `${defaultNamespace}-${parentName}`
  }
  // 获取父组件
  const getParent = (data) => {
    // 父组件
    let parentComponent = null
    // deep parent component
    const getComponent = (parent) => {
      const name = parent?.proxy?.$options?.name
      const pName = `${defaultNamespace}-${parentName}`
      if(name === pName) {
        parentComponent = parent
        return false
      }
      // 查找下一层
      parent.parent && getComponent(parent.parent)
    }
    getComponent(data)
    return parentComponent;
  }
  // 获取父级属性
  const props = (attr) => {
    const p = getParent(parent)
    return p?.props?.[attr] || false
  }
  return {
    group, props
  }
}
export const useStyle = () => {
  // 尺寸
  const fontSize = (value) => {
    return value ? {'font-size': `${value}px`} : {}
  }
  // 颜色
  const color = (value) => {
    return value ? {'color': value} : {}
  }
  // 宽度
  const width = (value) => {
    return value ? {'width': value} : {}
  }
  // 高度
  const height = (value) => {
    return value ? {'height': value} : {}
  }
  // 背景颜色
  const bgColor = (value) => {
    return value ? {'background-color': value} : {}
  }
  // 透明义
  const opacity = (value) => {
    return {'opacity': value || 1}
  }
  // 透明义
  const align = (value) => {
    return value ? {'text-align': value} : {}
  }
  return {
    fontSize,
    color,
    width,
    height,
    bgColor,
    opacity,
    align
  }
}

import { ref, computed } from "vue"
// 全局默认设置
export const initZindex = 3000
// 累加值 
export const zIndex = ref(0)
// hook
export const useZindex = () => {
  // 当前的
  const currentZindex = computed(() => initZindex + zIndex.value)
  // 累加的
  const nextZindex = () => {
    zIndex.value++
  }
  return {
    currentZindex,
    nextZindex
  }
}
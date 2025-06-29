<template>
  <button 
    :disabled="disabled || loading || _loading" 
    :class="[
      ns.b(), 
      ns.m(type), 
      ns.m('size', controlSize), 
      ns.is('round', round), 
      ns.is('disabled', disabled), 
      ns.is('loading', loading || _loading), 
      ns.is('text', text), 
      ns.is('link', link), 
      ns.is('border', border), 
      ns.is('block', block), 
      ns.is('dashed', dashed),
      ns.is('circle', circle),
      ns.is('button-group', isGroup)
    ]" 
    @click="handlerChange"
    type="button"
  >
    <template v-if="loading || _loading">
      <a-icon><Loading :class="[`${ns.is('loading-transition', loading || _loading)}`]" /></a-icon>
    </template>
    <a-icon v-if="icon || iconfont">
      <i v-if="iconfont" class="iconfont" :class="iconfont"></i>
      <component v-if="icon" :is="icon" />
    </a-icon>
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
<script>
export default { name: "a-button" };
</script>
<script setup>
import { ref, computed } from "vue"
import { useNamespace, useParent } from '@expresso-ui/hook';
import { useFormItem, AIcon } from "@expresso-ui/components"
import { Loading } from "@expresso-ui/icons"
// useFormItem
const { formContent, fromItemContent } = useFormItem()
const ns = useNamespace("button");
const parent = useParent("button-group");
/** emit */
const emit = defineEmits(['click'])
/** props */
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "default",
  },
  icon: {
    type: [String, Object],
    default: "",
  },
  iconfont:{
    type: String,
    default: "",
  },
  round: Boolean, // 圆形按钮
  disabled: Boolean, // 禁用按钮
  text: Boolean, // 文字按钮
  link: Boolean, // 链接按钮
  border: Boolean, // 边框按钮
  dashed: Boolean, // 虚线边框按钮
  block: Boolean, // 块级按钮
  circle: Boolean, // 圆形按钮
  loading: Boolean, // 加载按钮
  beforeChange: Function
});
/** computed */
const isGroup = parent.group()
const isGroupSize = parent.props('size')
const controlSize = computed(() => isGroupSize || formContent?.size?.value || props.size)
/** loading */
const _loading = ref(false)
/**
 * 点击事件
 */
const handlerChange = (ev) => {
  const isFunction = Object.prototype.toString.call(props.beforeChange) === '[object Function]'
  if(!isFunction) { 
    emit('click', ev)
  	return false
  }
  // 启用加载
  _loading.value = true
  props.beforeChange().finally(() => _loading.value = false)
}
</script>

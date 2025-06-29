// 默认命名前缀
import { defaultNamespace } from "../config"

export const useNamespace = (block) => {
  const namespace = defaultNamespace;
  // 生成Block（块）
  const b = (blockSuffix = "") => _bem(namespace, block, blockSuffix);
  // 生成Element（元素）
  const e = (element) => element ? _bem(namespace, block, "", element, "") : "";
  // 生成Modifier（元素）
  const m = (modifier, value) => modifier ? _bem(namespace, block, "", "", modifier, value) : "";
  // 状态设置
  const is = (name, state) => name && state ? `is-${name}` : '';
  return {
    namespace,
    b,
    e,
    m,
    is
  };
};

/**
 * BEM命名字符拼接函数
 * @param { String } namespace 命名空间
 * @param { String } block 块
 * @param { String } blockSuffix 子级块
 * @param { String } element 元素
 * @param { String } modifier 修改器
 * @param { String } modifierValue 修改器的值
 * @returns
 */
const _bem = (namespace, block, blockSuffix, element, modifier, modifierValue) => {
  // 默认Block（块）
  let className = `${namespace}-${block}`;
  // 如果存在子级块
  blockSuffix && (className += `-${blockSuffix}`);
  // 如果存在元素
  element && (className += `__${element}`);
  // 如果存在修改器
  modifier && (className += `--${modifier}`);
  // 如果存在修改器的值
  modifierValue && (className += `_${modifierValue}`);
  // 返回
  return className;
};

const _bem = (namespace, block, blockSuffix, element, modifier, modifierValue) => {
    let className = `${namespace}-${block}`
    if (blockSuffix) {
        className += `-${blockSuffix}`
    }
    if (element) {
        className += `__${element}`
    }
    if (modifier) {
        className += `--${modifier}`
    }
    if (modifierValue) {
        className += `__${modifierValue}`
    }
    return className
}

export const defaultNamespace = 'e'

export const useNamespace = (block) => {
    const namespace = defaultNamespace

    const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix)
    return {
        namespace,
        block: b
    }
}


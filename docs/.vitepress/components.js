const modulesFiles = import.meta.glob('../examples/**/*.vue', { eager: true })

let modules = {}
console.log('modulesFiles: ', modulesFiles)
for (const [key, value] of Object.entries(modulesFiles)) {
  const keys = key.split('/')
  const name = keys.splice(1).join('/')
  modules[name] = value.default
}

export default modules
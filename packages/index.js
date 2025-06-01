export * from './components/index'
import components from './components'

export const install = (app) => {
    if (install.installed) return
    components.forEach((c) => {
        app.use(c)
    })
}

export default install
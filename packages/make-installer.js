export const makeInstaller = (components) => {
  const install = (app) => {
    if (install.installed) return;
    components.forEach((c) => app.use(c))

  }
  return {
    install,
  }
}


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'ExpressoUI',
          esModule: true,
          resolveStyle: (name) => {
            const path = name.split('-')
            return `@expresso-ui/es/components/theme/${path[1]}/src/style/`
          }
        }
      ]
    })
  ],
})

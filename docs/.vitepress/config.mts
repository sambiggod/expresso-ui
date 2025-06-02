import { defineConfig } from 'vitepress'
import MdContainer from 'markdown-it-container'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  title: "业务组件库",
  description: "A UI Library Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '设计', link: '/guide/design' },
            { text: '安装', link: '/guide/install' },
            { text: '快速上手', link: '/guide/quickstart' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button', link: '/components/button' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(MdContainer, 'demo', {
        render: (tokens: string, idx: string) => {
          if (tokens[idx].nesting === 1) {
            const info = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            const description = info && info.length > 1 ? info[1] : ''

            const nextToken = tokens[idx + 1]
            const componentPath = nextToken.type === 'fence' ? nextToken.content : ''

            let source = ''
            if (componentPath) {
              let file = path.resolve(__dirname, `../examples`, `${componentPath}.vue`)
              file = file.replace(/\s+/g, '')
              source = fs.readFileSync(file, 'utf-8')
            }
            console.log('componentPath: ', componentPath)
            return `<Demo path="${componentPath.replace(/[\r\n]/g, '')}">
              <template #source>
                <pre v-pre><code class="language-html">${md.utils.escapeHtml(source)}</code></pre>
              </template>
              <template #description>
                ${description ? `${md.render(description)}` : ''}
              </template>
            `
          } else {
            return '</Demo>'
          }
        }
      })
    }
  }
})

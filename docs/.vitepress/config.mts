import { defineConfig } from 'vitepress'
import MdContainer from "markdown-it-container"
import path from 'path'
import fs from 'fs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "业务型组件",
  description: "A VitePress Site",
  appearance: true, // 是否启用暗黑模式切换
  themeConfig: {
    logo: '/images/logo.png',
    // 配置是否启用搜索
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '设计', link: '/guide/design' },
            { text: '安装', link: '/guide/install' },
            { text: '快速开始', link: '/guide/start' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '国际化', link: '/guide/lang' },
            { text: '主题', link: '/guide/theme' },
            { text: '暗黑模式', link: '/guide/diablo' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Checkbox 多选框', link: '/components/checkbox' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Select 下拉选项', link: '/components/select' },
            { text: 'Icon 图标', link: '/components/icon' }
          ]
        }
      ]
    },
  },
  markdown: {
    config: (md) => {
      md.use(MdContainer, 'demo', {
        validate(params) {
          return params.trim().match(/^demo\s*(.*)$|/);
        },
        render(tokens: string, idx: string){
          if (tokens[idx].nesting === 1) {
            // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
            const info = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            const description = info && info.length > 1 ? info[1] : ""; 
            // 获取路径
            const nextToken = tokens[idx + 1]
            const componentPath = nextToken.type === "fence" ? nextToken.content : "";
            /**
             * 读取文件
             */
            let source = ''
            if (componentPath) {
              let file = path.resolve(__dirname, "../examples", `${componentPath}.vue`);
              file = file.replace(/\s+/g, "");
              source = fs.readFileSync(file, "utf-8");
            }
            return `<Demo path=${componentPath}>
                      <template #source><pre><code class="language-html">${md.utils.escapeHtml(source)}</code></pre></template>
                      <template #description>${description ? `${md.render(description)}` : ""}</template>
                    `;
          } else {      
            return '</Demo>';
          }
        }
      })
    },
  },
})

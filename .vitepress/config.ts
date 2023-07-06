import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Docs",
  description: "A memory map to assist me in my web development journey",
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/markdown-examples' }
    ],
    search: { provider: 'local' },
    sidebar: [
      {
        text: 'All Blogs',
        items: [
          { text: 'Godot', link: '/godot/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sonukuldeep' }
    ]
  }
})

import { defineConfig } from 'vitepress'

import sidebar from './sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Y Học Dân Tộc",
  description: "Y học dân tộc mãi đỉnh",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap', rel: 'stylesheet' }
    ]
  ],
  ignoreDeadLinks: true,
  themeConfig: {
    // logo: '/logo.png',

    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: sidebar,
    // sidebar: mysidebar,
    // sidebar2: [
    //   {
    //     "base": "/do-tat-loi/",
    //     "text": "Gs.Ts Đỗ Tất Lợi",
    //     link: "home",
    //     collapsed: true,
    //     "items": [
    //       {
    //         "text": "Bài thuốc quí 1",
    //         "link": "bai-thuoc"
    //       },
    //       {
    //         "text": "Cây và Vị thuốc VN",
    //         "link": "cvvtvn/",
    //         "items": [
    //           {
    //             "text": "This is frontmatter title value.",
    //             "link": "cvvtvn/1.index"
    //           },
    //           {
    //             "text": "BA CHẠC - 三桠苦 2ß",
    //             "link": "cvvtvn/ba-chac"
    //           },
    //           {
    //             "text": "BA CHẼ - 假木豆",
    //             "link": "cvvtvn/ba-che"
    //           },
    //           {
    //             "text": "BẤC ĐÈN - 燈心草 (灯心草)",
    //             "link": "cvvtvn/bac-den"
    //           },
    //           {
    //             "text": "BẠC THAU - 白鹤藤",
    //             "link": "cvvtvn/bac-thau"
    //           },
    //           {
    //             "text": "VỎ LỰU - 石榴皮",
    //             "link": "cvvtvn/vo-luu"
    //           },
    //           {
    //             "text": "VỌNG CÁCH - 傘序臭黃荊 (伞序臭黄荆)",
    //             "link": "cvvtvn/vong-cach"
    //           },
    //           {
    //             "text": "XOAN - 苦楝",
    //             "link": "cvvtvn/xoan"
    //           }
    //         ]
    //       },
    //       {
    //         "text": "Sách 2",
    //         "link": "sach2/",
    //         "items": [
    //           {
    //             "text": "VỎ LỰU - 石榴皮",
    //             "link": "sach2/vo-luu"
    //           }
    //         ]
    //       }
    //     ]      
    //   },
      
    // ],
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    // sidebar: mysidebar,
    ignoreDeadLinks: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

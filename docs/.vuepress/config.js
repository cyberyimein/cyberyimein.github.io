module.exports = {
    title: 'typoKnight',
    description: "cyberyimein's sandpit",

    head: [
      ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      ["link", { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" }]
    ],

    theme: 'vuepress-theme-maker',
    themeConfig: {
      logo: '/logo.jpg',

      searchPlaceholder: 'Search ⌘+K',
      searchMaxSuggestions: 10,

      nav: [
        { text: '🏠 Home', link: '/' },
        { text: '💡 About', link: '/about/'}
      ],
      social: [
        {
          type: 'email',
          link: 'cyberyimein@outlook.com'
        },
        {
          type: 'github',
          link: 'cyberyimein'
        },
      ],

      blog: {
        directories: [
          {
            id: 'post',
            dirname: '_post',
            path: '/',
            itemPermalink: '/post/:year/:month/:day/:slug.html',
            frontmatter: { title: '' },
            pagination: {
              perPagePosts: 10,
              prevText: '',
              nextText: ''
            },
          }
        ],
        frontmatters: [
          {
            id: "tag",
            keys: ['tag', 'tags'],
            path: '/tags/',
            frontmatter: { title: 'Tag' },
            pagination: {
              lengthPerPage: 10,
              prevText: '',
              nextText: ''
            }
          },
          {
            id: "category",
            keys: ['category', 'categories'],
            path: '/categories/',
            frontmatter: { title: 'Category' },
            pagination: {
              lengthPerPage: 10,
              prevText: '',
              nextText: ''
            }
          }
        ],
        sitemap: {
          hostname: 'https://cyberyimein.github.io/',
          exclude: ["/404"]
        },
        feed: {
          canonical_base: 'canonical_base',
        },
        comment: {
          service: 'vssue',
        }
      },

      copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" rel="external nofollow noopener" </a>`
    },



    plugins: {
      '@vssue/vuepress-plugin-vssue': {
        // 设置 `platform` 而不是 `api`
        platform: 'github-v4',

        owner: 'cyberyimein',
        repo: 'cyberyimein.github.io',
        clientId: 'ed1cc440f490d6065b2c',
        clientSecret: 'e111fce5a641364db054fe8a14c8e6e21d489e71',
      },
      '@vuepress/last-updated': {
        transformer: timestamp => {
          return new Date(timestamp).toUTCString()
        }
      }
    },

  }
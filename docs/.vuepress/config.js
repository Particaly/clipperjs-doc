module.exports = {
    title: 'Clipper 6 Documentation',
    description: 'ClipperJsDoc',
    head: [
        ['link', {
            rel: 'icon',
            href: `/hero.png`
        }]
    ],
    dest: './dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        // displayAllHeaders: true,
        // sidebarDepth: 2,
        smoothScroll: true,
        sidebar: [
            {
                title: '文档目录',
                collapsable: false,
                children: [
                    ['/Overview/', '总览'],
                    ['/Preprocess/','预处理器定义'],
                    '/ClipperBase/',
                    '/Clipper/',
                ]
            },
        ]
        // sidebar: 'auto'
    }
};

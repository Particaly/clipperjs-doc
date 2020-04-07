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
    base: '/ClipperjsDoc/',
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
                    '/ClipperBase/',
                    '/Clipper/',
                    ['/Type/','Type'],
	                '/PolyTree/',
                    '/PolyNode/',
                    '/ClipperOffset/',
                    '/JS/',
                    ['/Preprocess/','杂项'],
                ]
            },
        ]
        // sidebar: 'auto'
    }
};

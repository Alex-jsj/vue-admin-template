//系统管理员端
const rootConfig = [
    {
        path: '/pages/index',
        component: () => import('@/pages/public/index'),
        children: [
            {
                path: '/',
                redirect: 'home',
                component: () => import('@/pages/public/home')
            },
            {
                path: 'account_information',
                name: 'account_information',
                component: () => import('@/pages/public/account_information'),
                meta: {
                    title: 'personInfo'
                }
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/public/home'),
                meta: {
                    title: 'home'
                }
            },
            {
                path: 'intro',
                name: 'intro',
                component: () => import('@/pages/intro/index'),
                meta: {
                    title: 'introductoryPage'
                }
            },
            {
                path: 'icon',
                name: 'icon',
                component: () => import('@/pages/public/icon'),
                meta: {
                    title: 'icon'
                }
            },
            {
                path: 'component',
                component: () => import('@/pages/component/index'),
                meta: {
                    title: 'component'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'editor',
                        component: () => import('@/pages/component/editor')
                    },
                    {
                        path: 'editor',
                        name: 'editor',
                        component: () => import('@/pages/component/editor'),
                        meta: {
                            title: 'components.textEditor',
                            permissionName: 'editor'
                        }
                    },
                    {
                        path: 'imgUpload',
                        name: 'imgUpload',
                        component: () => import('@/pages/component/imgUpload'),
                        meta: {
                            title: 'components.imgUpload',
                            permissionName: 'imgUpload'
                        }
                    },
                    {
                        path: 'CountTo',
                        name: 'CountTo',
                        component: () => import('@/pages/component/CountTo'),
                        meta: {
                            title: 'components.countTo',
                            permissionName: 'CountTo'
                        }
                    },
                    {
                        path: 'miniComponent',
                        name: 'miniComponent',
                        component: () =>
                            import('@/pages/component/miniComponent'),
                        meta: {
                            title: 'components.miniComponent',
                            permissionName: 'miniComponent'
                        }
                    },
                    {
                        path: 'videoPlayer',
                        name: 'videoPlayer',
                        component: () =>
                            import('@/pages/component/videoPlayer'),
                        meta: {
                            title: 'components.videoPlayer',
                            permissionName: 'videoPlayer'
                        }
                    }
                ]
            },
            {
                path: 'film',
                component: () => import('@/pages/film/index'),
                meta: {
                    title: '入围影片'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'list',
                        component: () => import('@/pages/film/list')
                    },
                    {
                        path: 'list',
                        name: 'film_list',
                        component: () => import('@/pages/film/list'),
                        meta: {
                            title: '入围影片列表'
                        }
                    },
                    {
                        path: 'add',
                        name: 'film_add',
                        component: () => import('@/pages/film/add'),
                        meta: {
                            title: '添加影片',
                            need_path: '/pages/index/film/list'
                        }
                    },
                    {
                        path: 'edit',
                        name: 'film_edit',
                        component: () => import('@/pages/film/edit'),
                        meta: {
                            title: '编辑影片',
                            need_path: '/pages/index/film/list'
                        }
                    },
                    {
                        path: 'classify',
                        name: 'classify_list',
                        component: () => import('@/pages/film/classify'),
                        meta: {
                            title: '分类列表'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/404'
    }
];

export default rootConfig;

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
                    title: '个人信息'
                }
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/public/home'),
                meta: {
                    title: '工作台'
                }
            },
            {
                path: 'intro',
                name: 'intro',
                component: () => import('@/pages/intro/index'),
                meta: {
                    title: '引导页'
                }
            },
            {
                path: 'icon',
                name: 'icon',
                component: () => import('@/pages/public/icon'),
                meta: {
                    title: '图标'
                }
            },
            {
                path: 'component',
                component: () => import('@/pages/component/index'),
                meta: {
                    title: '组件'
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
                            title: '富文本编辑器',
                            permissionName: 'editor'
                        }
                    },
                    {
                        path: 'imgUpload',
                        name: 'imgUpload',
                        component: () => import('@/pages/component/imgUpload'),
                        meta: {
                            title: '图片上传',
                            permissionName: 'imgUpload'
                        }
                    },
                    {
                        path: 'CountTo',
                        name: 'CountTo',
                        component: () => import('@/pages/component/CountTo'),
                        meta: {
                            title: 'CountTo',
                            permissionName: 'CountTo'
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

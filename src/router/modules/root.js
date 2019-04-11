//系统管理员端
const rootConfig = [
    {
        path: '/pages/index',
        component: () => import('@/pages/public/index'),
        children: [
            {
                path: '/',
                redirect: 'home',
                component: () => import('@/pages/home/index')
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
                component: () => import('@/pages/home/index'),
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
                path: 'i18n',
                name: 'i18n',
                component: () => import('@/pages/international/index'),
                meta: {
                    title: 'international'
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
                path: 'tables',
                component: () => import('@/pages/table/index'),
                meta: {
                    title: 'table'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'dynamicTable',
                        component: () => import('@/pages/table/dynamicTable')
                    },
                    {
                        path: 'dynamicTable',
                        name: 'dynamicTable',
                        component: () => import('@/pages/table/dynamicTable'),
                        meta: {
                            title: 'tables.comprehensiveForm'
                        }
                    },
                    {
                        path: 'treeGrid',
                        name: 'treeGrid',
                        component: () => import('@/pages/table/treeGrid'),
                        meta: {
                            title: 'tables.treeGrid'
                        }
                    }
                ]
            },
            {
                path: 'charts',
                component: () => import('@/pages/charts/index'),
                meta: {
                    title: 'chart'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'chartLine',
                        component: () => import('@/pages/charts/line')
                    },
                    {
                        path: 'line',
                        name: 'chartLine',
                        component: () => import('@/pages/charts/line'),
                        meta: {
                            title: 'charts.line'
                        }
                    },
                    {
                        path: 'bar',
                        name: 'bar',
                        component: () => import('@/pages/charts/bar'),
                        meta: {
                            title: 'charts.histogram'
                        }
                    },
                    {
                        path: 'map',
                        name: 'map',
                        component: () => import('@/pages/charts/map'),
                        meta: {
                            title: 'charts.map'
                        }
                    },
                    {
                        path: 'progress',
                        name: 'progress',
                        component: () => import('@/pages/charts/progress'),
                        meta: {
                            title: 'charts.progress'
                        }
                    },
                    {
                        path: 'disk',
                        name: 'disk',
                        component: () => import('@/pages/charts/disk'),
                        meta: {
                            title: 'charts.disk'
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

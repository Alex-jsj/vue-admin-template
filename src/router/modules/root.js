//系统管理员端
const rootConfig = [
    {
        path: '/views/index',
        component: () => import('@/views/public/index'),
        children: [
            {
                path: '/',
                redirect: 'home',
                component: () => import('@/views/home/index')
            },
            {
                path: 'account_information',
                name: 'account_information',
                component: () => import('@/views/public/account_information'),
                meta: {
                    title: 'personInfo'
                }
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index'),
                meta: {
                    title: 'home'
                }
            },
            {
                path: 'intro',
                name: 'intro',
                component: () => import('@/views/intro/index'),
                meta: {
                    title: 'introductoryPage'
                }
            },
            {
                path: 'icon',
                name: 'icon',
                component: () => import('@/views/public/icon'),
                meta: {
                    title: 'icon'
                }
            },
            {
                path: 'i18n',
                name: 'i18n',
                component: () => import('@/views/international/index'),
                meta: {
                    title: 'international'
                }
            },
            {
                path: 'component',
                component: () => import('@/views/component/index'),
                meta: {
                    title: 'component'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'editor',
                        component: () => import('@/views/component/editor')
                    },
                    {
                        path: 'editor',
                        name: 'editor',
                        component: () => import('@/views/component/editor'),
                        meta: {
                            title: 'components.textEditor',
                            permissionName: 'editor'
                        }
                    },
                    {
                        path: 'imgUpload',
                        name: 'imgUpload',
                        component: () => import('@/views/component/imgUpload'),
                        meta: {
                            title: 'components.imgUpload',
                            permissionName: 'imgUpload'
                        }
                    },
                    {
                        path: 'CountTo',
                        name: 'CountTo',
                        component: () => import('@/views/component/CountTo'),
                        meta: {
                            title: 'components.countTo',
                            permissionName: 'CountTo'
                        }
                    },
                    {
                        path: 'miniComponent',
                        name: 'miniComponent',
                        component: () =>
                            import('@/views/component/miniComponent'),
                        meta: {
                            title: 'components.miniComponent',
                            permissionName: 'miniComponent'
                        }
                    },
                    {
                        path: 'videoPlayer',
                        name: 'videoPlayer',
                        component: () =>
                            import('@/views/component/videoPlayer'),
                        meta: {
                            title: 'components.videoPlayer',
                            permissionName: 'videoPlayer'
                        }
                    }
                ]
            },
            {
                path: 'tables',
                component: () => import('@/views/table/index'),
                meta: {
                    title: 'table'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'dynamicTable',
                        component: () => import('@/views/table/dynamicTable')
                    },
                    {
                        path: 'dynamicTable',
                        name: 'dynamicTable',
                        component: () => import('@/views/table/dynamicTable'),
                        meta: {
                            title: 'tables.comprehensiveForm'
                        }
                    },
                    {
                        path: 'treeGrid',
                        name: 'treeGrid',
                        component: () => import('@/views/table/treeGrid'),
                        meta: {
                            title: 'tables.treeGrid'
                        }
                    }
                ]
            },
            {
                path: 'charts',
                component: () => import('@/views/charts/index'),
                meta: {
                    title: 'chart'
                },
                children: [
                    {
                        path: '/',
                        redirect: 'chartLine',
                        component: () => import('@/views/charts/line')
                    },
                    {
                        path: 'line',
                        name: 'chartLine',
                        component: () => import('@/views/charts/line'),
                        meta: {
                            title: 'charts.line'
                        }
                    },
                    {
                        path: 'bar',
                        name: 'bar',
                        component: () => import('@/views/charts/bar'),
                        meta: {
                            title: 'charts.histogram'
                        }
                    },
                    {
                        path: 'map',
                        name: 'map',
                        component: () => import('@/views/charts/map'),
                        meta: {
                            title: 'charts.map'
                        }
                    },
                    {
                        path: 'progress',
                        name: 'progress',
                        component: () => import('@/views/charts/progress'),
                        meta: {
                            title: 'charts.progress'
                        }
                    },
                    {
                        path: 'disk',
                        name: 'disk',
                        component: () => import('@/views/charts/disk'),
                        meta: {
                            title: 'charts.disk'
                        }
                    },
                    {
                        path: 'mixed',
                        name: 'mixed',
                        component: () => import('@/views/charts/mixed'),
                        meta: {
                            title: 'charts.mixedChart'
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

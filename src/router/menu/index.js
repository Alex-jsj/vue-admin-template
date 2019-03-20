// 超级管理员
export const superAdmin = [
    {
        // title: this.$t('route.home'),
        title: 'home',
        url: '/pages/index/home',
        icon: 'home',
        children: []
    },
    {
        title: 'introductoryPage',
        url: '/pages/index/intro',
        icon: 'intro',
        children: []
    },
    {
        title: 'icon',
        url: '/pages/index/icon',
        icon: 'icon',
        children: []
    },
    {
        title: 'component',
        url: '/pages/index/userManage',
        icon: 'component',
        children: [
            {
                title: '富文本编辑器',
                url: '/pages/index/component/editor'
            },
            {
                title: '图片上传',
                url: '/pages/index/component/imgUpload',
                children: []
            },
            {
                title: 'CountTo',
                url: '/pages/index/component/CountTo',
                children: []
            },
            {
                title: '小组件',
                url: '/pages/index/component/userManage_role',
                children: []
            },
            {
                title: '返回顶部',
                url: '/pages/index/component/userManage_role',
                children: []
            },
            {
                title: '拖拽列表',
                url: '/pages/index/component/userManage_role',
                children: []
            }
        ]
    },
    {
        title: 'chart',
        url: '/pages/index/userManage',
        icon: 'chart',
        children: [
            {
                title: '折线图',
                url: '/pages/index/userManage/userManage_system',
                children: []
            },
            {
                title: '柱状图',
                url: '/pages/index/userManage/userManage_cbjg',
                children: []
            },
            {
                title: '地图',
                url: '/pages/index/userManage/userManage_role',
                children: []
            },
            {
                title: '进度条',
                url: '/pages/index/userManage/userManage_role',
                children: []
            },
            {
                title: '圆盘',
                url: '/pages/index/userManage/userManage_role',
                children: []
            },
            {
                title: '混合图表',
                url: '/pages/index/userManage/userManage_role',
                children: []
            }
        ]
    },
    {
        title: 'table',
        url: '/pages/index/userManage',
        icon: 'form',
        children: [
            {
                title: '动态表格',
                url: '/pages/index/userManage/userManage_system',
                children: []
            },
            {
                title: '表格内编辑',
                url: '/pages/index/userManage/userManage_cbjg',
                children: []
            },
            {
                title: '树形表格',
                url: '/pages/index/userManage/userManage_role',
                children: []
            },
            {
                title: '综合表格',
                url: '/pages/index/userManage/userManage_role',
                children: []
            }
        ]
    },
    {
        title: 'errorPage',
        url: '/pages/index/userManage',
        icon: 'warn',
        children: [
            {
                title: '401',
                url: '/pages/index/userManage/userManage_system',
                children: []
            },
            {
                title: '404',
                url: '/pages/index/userManage/userManage_cbjg',
                children: []
            }
        ]
    },
    {
        title: 'errorLog',
        url: '/pages/index/userManage',
        icon: 'journal',
        children: []
    },
    {
        title: 'zip',
        url: '/pages/index/userManage',
        icon: 'zip',
        children: [
            {
                title: '导出Zip',
                url: '/pages/index/userManage/userManage_system',
                children: []
            }
        ]
    },
    {
        title: 'pdf',
        url: '/pages/index/userManage',
        icon: 'pdf',
        children: [
            {
                title: '导出PDF',
                url: '/pages/index/userManage/userManage_system',
                children: []
            }
        ]
    },
    {
        title: 'international',
        url: '/pages/index/userManage',
        icon: 'in',
        children: []
    }
];

export default {
    superAdmin
};

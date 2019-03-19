// 超级管理员
export const superAdmin = [
    {
        title: '工作台',
        url: '/pages/index/home',
        icon: 'home',
        children: []
    },
    {
        title: '引导页',
        url: '/pages/index/intro',
        icon: 'intro',
        children: []
    },
    {
        title: '图标',
        url: '/pages/index/icon',
        icon: 'icon',
        children: []
    },
    {
        title: '组件',
        url: '/pages/index/userManage',
        icon: 'component',
        children: [
            {
                title: '富文本编辑器',
                url: '/pages/index/components/editor'
            },
            {
                title: '图片上传',
                url: '/pages/index/components/imgUpload',
                children: []
            },
            {
                title: 'CountTo',
                url: '/pages/index/components/CountTo',
                children: []
            },
            {
                title: '小组件',
                url: '/pages/index/components/userManage_role',
                children: []
            },
            {
                title: '返回顶部',
                url: '/pages/index/components/userManage_role',
                children: []
            },
            {
                title: '拖拽列表',
                url: '/pages/index/components/userManage_role',
                children: []
            }
        ]
    },
    {
        title: '图表',
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
        title: '表格',
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
        title: '错误页面',
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
        title: '错误日志',
        url: '/pages/index/userManage',
        icon: 'journal',
        children: []
    },
    {
        title: 'Zip',
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
        title: 'PDF',
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
        title: '国际化',
        url: '/pages/index/userManage',
        icon: 'in',
        children: []
    }
];

export default {
    superAdmin
};

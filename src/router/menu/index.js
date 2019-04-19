// 超级管理员
export const superAdmin = [
    {
        // title: this.$t('route.home'),
        title: "home",
        url: "/views/index/home",
        icon: "home",
        children: []
    },
    {
        title: "introductoryPage",
        url: "/views/index/intro",
        icon: "intro",
        children: []
    },
    {
        title: "icon",
        url: "/views/index/icon",
        icon: "icon",
        children: []
    },
    {
        title: "component",
        url: "/views/index/component",
        icon: "component",
        children: [
            {
                title: "components.textEditor",
                url: "/views/index/component/editor"
            },
            {
                title: "components.imgUpload",
                url: "/views/index/component/imgUpload",
                children: []
            },
            {
                title: "components.countTo",
                url: "/views/index/component/CountTo",
                children: []
            },
            {
                title: "components.miniComponent",
                url: "/views/index/component/miniComponent",
                children: []
            },
            {
                title: "components.videoPlayer",
                url: "/views/index/component/videoPlayer",
                children: []
            },
            {
                title: "components.dragList",
                url: "/views/index/component/userManage_role",
                children: []
            }
        ]
    },
    {
        title: "chart",
        url: "/views/index/charts",
        icon: "chart",
        children: [
            {
                title: "charts.histogram",
                url: "/views/index/charts/bar",
                children: []
            },
            {
                title: "charts.line",
                url: "/views/index/charts/line",
                children: []
            },
            {
                title: "charts.map",
                url: "/views/index/charts/map",
                children: []
            },
            {
                title: "charts.progress",
                url: "/views/index/charts/progress",
                children: []
            },
            {
                title: "charts.disk",
                url: "/views/index/charts/disk",
                children: []
            },
            {
                title: "charts.mixedChart",
                url: "/views/index/charts/mixed",
                children: []
            }
        ]
    },
    {
        title: "table",
        url: "/views/index/tables",
        icon: "form",
        children: [
            {
                title: "tables.comprehensiveForm",
                url: "/views/index/tables/dynamicTable",
                children: []
            },
            {
                title: "tables.treeGrid",
                url: "/views/index/tables/treeGrid",
                children: []
            }
        ]
    },
    {
        title: "errorPage",
        url: "/views/index/userManage",
        icon: "warn",
        children: [
            {
                title: "errorPages.401",
                url: "/views/index/userManage/userManage_system",
                children: []
            },
            {
                title: "errorPages.404",
                url: "/views/index/userManage/userManage_cbjg",
                children: []
            }
        ]
    },
    {
        title: "errorLog",
        url: "/views/index/userManage",
        icon: "journal",
        children: []
    },
    {
        title: "zip",
        url: "/views/index/userManage",
        icon: "zip",
        children: [
            {
                title: "zips.exportZip",
                url: "/views/index/userManage/userManage_system",
                children: []
            }
        ]
    },
    {
        title: "pdf",
        url: "/views/index/userManage",
        icon: "pdf",
        children: [
            {
                title: "pdfs.exportPdf",
                url: "/views/index/userManage/userManage_system",
                children: []
            }
        ]
    },
    {
        title: "international",
        url: "/views/index/i18n",
        icon: "in",
        children: []
    }
];

export default {
    superAdmin
};

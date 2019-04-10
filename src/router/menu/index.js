// 超级管理员
export const superAdmin = [
    {
        // title: this.$t('route.home'),
        title: "home",
        url: "/pages/index/home",
        icon: "home",
        children: []
    },
    {
        title: "introductoryPage",
        url: "/pages/index/intro",
        icon: "intro",
        children: []
    },
    {
        title: "icon",
        url: "/pages/index/icon",
        icon: "icon",
        children: []
    },
    {
        title: "component",
        url: "/pages/index/component",
        icon: "component",
        children: [
            {
                title: "components.textEditor",
                url: "/pages/index/component/editor"
            },
            {
                title: "components.imgUpload",
                url: "/pages/index/component/imgUpload",
                children: []
            },
            {
                title: "components.countTo",
                url: "/pages/index/component/CountTo",
                children: []
            },
            {
                title: "components.miniComponent",
                url: "/pages/index/component/miniComponent",
                children: []
            },
            {
                title: "components.videoPlayer",
                url: "/pages/index/component/videoPlayer",
                children: []
            },
            {
                title: "components.dragList",
                url: "/pages/index/component/userManage_role",
                children: []
            }
        ]
    },
    {
        title: "chart",
        url: "/pages/index/charts",
        icon: "chart",
        children: [
            {
                title: "charts.histogram",
                url: "/pages/index/charts/bar",
                children: []
            },
            {
                title: "charts.line",
                url: "/pages/index/charts/line",
                children: []
            },
            {
                title: "charts.map",
                url: "/pages/index/charts/map",
                children: []
            },
            {
                title: "charts.progress",
                url: "/pages/index/charts/progress",
                children: []
            },
            {
                title: "charts.disk",
                url: "/pages/index/charts/disk",
                children: []
            },
            {
                title: "charts.mixedChart",
                url: "/pages/index/charts/mixedChart",
                children: []
            }
        ]
    },
    {
        title: "table",
        url: "/pages/index/tables",
        icon: "form",
        children: [
            {
                title: "tables.comprehensiveForm",
                url: "/pages/index/tables/dynamicTable",
                children: []
            },
            {
                title: "tables.editInTable",
                url: "/pages/index/tables/",
                children: []
            },
            {
                title: "tables.treeGrid",
                url: "/pages/index/tables/treeGrid",
                children: []
            }
        ]
    },
    {
        title: "errorPage",
        url: "/pages/index/userManage",
        icon: "warn",
        children: [
            {
                title: "errorPages.401",
                url: "/pages/index/userManage/userManage_system",
                children: []
            },
            {
                title: "errorPages.404",
                url: "/pages/index/userManage/userManage_cbjg",
                children: []
            }
        ]
    },
    {
        title: "errorLog",
        url: "/pages/index/userManage",
        icon: "journal",
        children: []
    },
    {
        title: "zip",
        url: "/pages/index/userManage",
        icon: "zip",
        children: [
            {
                title: "zips.exportZip",
                url: "/pages/index/userManage/userManage_system",
                children: []
            }
        ]
    },
    {
        title: "pdf",
        url: "/pages/index/userManage",
        icon: "pdf",
        children: [
            {
                title: "pdfs.exportPdf",
                url: "/pages/index/userManage/userManage_system",
                children: []
            }
        ]
    },
    {
        title: "international",
        url: "/pages/index/i18n",
        icon: "in",
        children: []
    }
];

export default {
    superAdmin
};

export default {
    base: {
        name: '陈小银',
        websiteTitle: 'Vue后台管理系统',
        zoom:
            '你的浏览器目前处于缩放状态，页面可能会出现错位现象，建议100%大小显示',
        tips: '提示',
        noData: '暂无数据',
        to: '至'
    },
    route: {
        home: '工作台',
        introductoryPage: '引导页',
        icon: '图标',
        component: '组件',
        components: {
            textEditor: '富文本编辑器',
            imgUpload: '图片上传',
            countTo: 'CountTo',
            miniComponent: '小组件',
            backTop: '返回顶部',
            dragList: '拖拽列表'
        },
        chart: '图表',
        charts: {
            histogram: '柱状图',
            line: '折线图',
            map: '地图',
            progress: '进度条',
            disk: '圆盘',
            mixedChart: '混合图表'
        },
        tables: {
            dynamicForm: '动态表格',
            editInTable: '表格内编辑',
            treeGrid: '树形表格',
            comprehensiveForm: '综合表格'
        },
        table: '表格',
        zip: 'Zip',
        zips: {
            exportZip: '导出Zip'
        },
        pdf: 'pdf',
        pdfs: {
            exportPdf: '导出pdf'
        },
        errorPage: '错误页面',
        errorPages: {
            '401': '401',
            '404': '404'
        },
        errorLog: '错误日志',
        international: '国际化',
        personInfo: '个人信息',
        message: '消息通知'
    },
    login: {
        title1: '欢迎使用',
        title2: 'VUE后台管理系统',
        user: '请输入用户名',
        psd: '请输入密码',
        forgetPassword: '忘记密码',
        signIn: '登 录',
        contact: '请联系系统管理员',
        email: '邮箱',
        showPsd: '显示密码',
        hiddenPsd: '隐藏密码',
        captcha: '请输入验证码',
        userErr1: '用户名不能为空!',
        userErr2: '用户名应为6~20位数字/字母/下划线!',
        psdErr1: '密码不能为空!',
        psdErr2: '密码应为6~15位，英文与数字或下划线组合!',
        captchaErr: '验证码不能为空!',
        success: '登陆成功',
        fail: '账号或密码错误',
        tips: '提示',
        alreadyOnline:
            '您的帐号已经登录系统，是否继续登录？（如非本人操作，建议您修改密码以确保帐号安全）',
        continue: '继续登录',
        cancel: '取消',
        cancelLogin: '取消登录'
    },
    sideBar: {
        packUp: '收起菜单'
    },
    topBar: {
        userBoard: {
            logout: '退出登录',
            changePassword: '修改密码',
            messageNotification: '消息通知',
            userName: '登录用户名'
        }
    },
    tagsView: {
        refresh: '刷新',
        close: '关闭',
        closeOthers: '关闭其他',
        closeAll: '关闭全部'
    },
    fixedTool: {
        backToTop:'',
        goToBottom:'',
        closeSet:'',
        openSet:'',
        theme: '整体风格设置',
        themeConfig: {
            content1: '亮色菜单风格',
            content2: '暗色菜单风格'
        },
        navigation: '导航模式',
        navigationConfig: {
            content1: '侧边菜单布局',
            content2: '顶部菜单布局',
            retract: '收起导航',
            fixed: '固定导航',
            config1: '侧边菜单布局时可配置',
            config2: '顶部菜单布局时可配置'
        },
        contentWidth: {
            text: '内容区域宽度'
        }
    },
    home: {
        dataOverview: '数据概览',
        trend: '趋势',
        serverInformation: '服务器信息',
        numberOfAttachments: '附件数量',
        diskOccupiedByTheSystem: '系统所占磁盘(MB)',
        diskOccupiedBySystemLog: '系统日志所占磁盘(MB)',
        diskOccupiedByDataBackup: '数据备份所占磁盘(MB)',
        dataBoard: '数据看板',
        QueryTime: '查询时间',
        visitor1: '今日访客',
        visitor2: '本周访客',
        visitor3: '本月访客',
        visitor4: '年度访客',
        canvas: {
            data1: '数据 1',
            data2: '数据 2'
        }
    },
    introductorPage: {
        text: '打开引导',
        prevLabel: '← 上一步',
        nextLabel: '下一步 →',
        skipLabel: '跳过',
        doneLabel: '结束',
        step1: '语言切换',
        step2: '用户信息',
        step3: '面包屑导航',
        step4: '标签页',
        step5: '系统设置'
    },
    textEditor: '基于tinymce封装的富文本编辑器组件'
};

export default {
    base: {
        websiteTitle: 'Vue Backstage Management System', // 站点名称
        dataOverview: 'Data Overview', // 数据概览
        trend: 'Trend', // 趋势
        serverInformation: 'Server Information', // 服务器信息
        numberOfAttachments: 'Number of attachments', //附件数量
        diskOccupiedByTheSystem: 'Disk occupied by the system(MB)',
        diskOccupiedBySystemLog: 'Disk occupied by system log(MB)',
        diskOccupiedByDataBackup: 'Disk occupied by data backup(MB)',
        dataBoard: 'Data Board'
    },
    route: {
        home: 'Workbench',
        introductoryPage: 'Introductory Page',
        icon: 'Icon',
        component: 'Component',
        components: {
            textEditor: 'Text Editor',
            imgUpload: 'Img Upload',
            countTo: 'CountTo',
            miniComponent: 'Mini Component',
            backTop: 'Back Top',
            dragList: 'Drag List'
        },
        charts: {
            histogram: 'Histogram',
            line: 'line',
            map: 'Map',
            progress: 'Progress',
            disk: 'Disk',
            mixedChart: 'Mixed Chart'
        },
        tables: {
            dynamicForm: 'Dynamic Form',
            editInTable: 'Edit In Table',
            treeGrid: 'Tree Grid',
            comprehensiveForm: 'Comprehensive Form'
        },
        zips: {
            exportZip: 'Export Zip'
        },
        pdfs: {
            exportPdf: 'Export pdf'
        },
        errorPages: {
            '401': '401',
            '404': '404'
        },
        chart: 'Chart',
        table: 'Table',
        zip: 'Zip',
        pdf: 'pdf',
        errorPage: 'Error Page',
        errorLog: 'Error Log',
        international: 'International'
    },
    login: {
        title1: 'Welcome to use',
        title2: 'Vue Backstage Management System',
        user: 'Enter one user name',
        psd: 'Input password',
        forgetPassword: 'Forget password',
        signIn: 'Sign In',
        contact: 'Please contact the system administrator',
        email: 'Email',
        showPsd: 'Show Password',
        hiddenPsd: 'Hidden Password',
        captcha: 'Input calculation results',
        userErr1: 'User name cannot be empty!',
        userErr2: 'User names should be 6-20 digits/letters/underscores!',
        psdErr1: 'Password name cannot be empty!',
        psdErr2: 'The password should be 6-15 digits/letters/underscores!',
        captchaErr: 'Captcha name cannot be empty!',
        success: 'Login successfully',
        fail: 'Error in account or password',
        tips: 'Tips',
        alreadyOnline:
            'Your account has been logged in. Do you want to continue? (If you do not operate by yourself, it is recommended that you modify your password to ensure account security)',
        continue: 'Continue login',
        cancel: 'Cancel',
        cancelLogin: 'Cancel Login'
    }
};

const red = '#f56c6c';
const green = '#67c23a';
const grey = '#d9d9d9';
const yellow = '#e6a23c';
const wechat_icon = 'icon-wechat';
const alipay_icon = 'icon-alipay';
const yinlian_icon = 'icon-yinlian';

// 冻结 未冻结
// list 数据，string_type 需要检测的字段名称
export function checkFreeze(val) {
    let value = val;
    let obj = {
        class_name: '',
        text_name: ''
    };
    switch (value) {
        case -1:
            obj.class_name = grey;
            obj.text_name = '冻结';
            break;
        case 1:
            obj.class_name = green;
            obj.text_name = '正常';
            break;
        default:
            obj.class_name = '';
            obj.text_name = '';
    }
    return obj;
}

// 男女
export function checkSex(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            switch (item[string_type]) {
                case 0:
                    item[text_name] = '男';
                    break;
                case 1:
                    item[text_name] = '女';
                    break;
                default:
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 合格 降级合格 不合格 缺考 未录入
// list 数据，string_type 需要检测的字段名称
export function checkaAhievement(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 0:
                    item[class_name] = '';
                    item[text_name] = '未录入';
                    break;
                case 1:
                    item[class_name] = green;
                    item[text_name] = '合格';
                    break;
                case 2:
                    item[class_name] = yellow;
                    item[text_name] = '降级合格';
                    break;
                case -1:
                    item[class_name] = red;
                    item[text_name] = '不合格';
                    break;
                case -2:
                    item[class_name] = grey;
                    item[text_name] = '缺考';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '未录入';
            }
        });
        return list;
    }
}
// 报考渠道
// list 数据，string_type 需要检测的字段名称
export function checkOrigin(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            switch (item[string_type]) {
                case 1:
                    item[text_name] = '后台单人报考';
                    break;
                case 2:
                    item[text_name] = '后台批量报考';
                    break;
                case 3:
                    item[text_name] = 'PC端单人报考';
                    break;
                case 4:
                    item[text_name] = '微信端报考';
                    break;
                default:
                    item[text_name] = '';
            }
        });
        return list;
    }
}
// 管理员 考级中心 证书 财务 教师
// list 数据，string_type 需要检测的字段名称
export function checkRole(val) {
    let value = val;
    let obj = {
        class_name: '',
        text_name: '',
        type_name: ''
    };
    switch (value) {
        case 'super':
            obj.class_name = 'icon-kaojizhongxin';
            obj.text_name = '系统管理员';
            obj.type_name = 'danger';
            break;
        case 'admin':
            obj.class_name = 'icon-guanliyuan';
            obj.text_name = '考级中心管理员';
            obj.type_name = 'warning';
            break;
        case 'payment':
            obj.class_name = 'icon-caiwuyuan';
            obj.text_name = '财务管理端';
            obj.type_name = '';
            break;
        case 'cert':
            obj.class_name = 'icon-zhengshu-geren';
            obj.text_name = '证书打印端';
            obj.type_name = 'success';
            break;
        case 'teacher':
            obj.class_name = 'icon-jiaoshi';
            obj.text_name = '教师端';
            obj.type_name = 'info';
            break;
    }
    return obj;
}

// 已上传 未上传
// list 数据，string_type 需要检测的字段名称
export function checkUpload(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case null:
                    item[class_name] = grey;
                    item[text_name] = '未上传';
                    break;
                case undefined:
                    item[class_name] = grey;
                    item[text_name] = '未上传';
                    break;
                case item[string_type]:
                    item[class_name] = green;
                    item[text_name] = '已上传';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 已支付 未支付
// list 数据，string_type 需要检测的字段名称
export function checkPay(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未支付';
                    break;
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已支付';
                    break;
                default:
                    item[class_name] = grey;
                    item[text_name] = '未支付';
            }
        });
        return list;
    }
}

// 已打印 未打印
// list 数据，string_type 需要检测的字段名称
export function checkPrint(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已打印';
                    break;
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未打印';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 已开放 未开放
// list 数据，string_type 需要检测的字段名称
export function checkOpen(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已开放';
                    break;
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未开放';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 已分账 未分账
// list 数据，string_type 需要检测的字段名称
export function checkFenzhang(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已分账';
                    break;
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未分账';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 已分配 未分配
// list 数据，string_type 需要检测的字段名称
export function checkFenpei(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已分配';
                    break;
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未分配';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 已生成 未生成
// list 数据，string_type 需要检测的字段名称
export function checkZkz(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Color'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = green;
                    item[text_name] = '已生成';
                    break;
                case 0:
                    item[class_name] = grey;
                    item[text_name] = '未生成';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

// 微信 支付宝 银联
// list 数据，string_type 需要检测的字段名称
export function checkPayment(arr, string_type) {
    let list = JSON.parse(JSON.stringify(arr)) || [];
    if (Object.prototype.toString.call(list) === '[object Array]') {
        const class_name = string_type + 'Payment'; // class名字
        const text_name = string_type + 'Text'; // text名字
        list.map(item => {
            item[class_name] = '';
            switch (item[string_type]) {
                case 1:
                    item[class_name] = alipay_icon;
                    item[text_name] = '支付宝';
                    break;
                case 2:
                    item[class_name] = wechat_icon;
                    item[text_name] = '微信';
                    break;
                case 3:
                    item[class_name] = yinlian_icon;
                    item[text_name] = '银联';
                    break;
                default:
                    item[class_name] = '';
                    item[text_name] = '暂无数据';
            }
        });
        return list;
    }
}

export default {
    checkFreeze,
    checkUpload,
    checkPay,
    checkPayment,
    checkFenzhang,
    checkaAhievement,
    checkFenpei,
    checkZkz,
    checkOpen,
    checkPrint,
    checkSex,
    checkRole,
    checkOrigin
};

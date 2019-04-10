// 密码验证
export function checkPsd(rule, value, callback) {
    let reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
    if (!value) {
        callback(new Error("密码不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("密码必须为6~15位，英文与数字或下划线组合"));
    } else {
        callback();
    }
}
// 数字验证
export function checkNum(rule, value, callback) {
    let reg = /^[0-9]*$/;
    if (!value) {
        return callback(new Error("不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("格式必须为数字"));
    } else {
        callback();
    }
}
// 邮箱验证（非必填）
export function checkEmail(rule, value, callback) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!value) {
        callback();
    } else if (reg.test(value) == false) {
        callback(new Error("邮箱格式错误"));
    } else {
        callback();
    }
}
// 金钱验证
export function checkPrice(rule, value, callback) {
    // let reg = /^[0-9]*$/;
    let reg = /^\d*\.{0,1}\d{0,2}$/; //数字 小数点不出现或只能出现一次
    if (!value) {
        return callback(new Error("不能为空"));
    } else if (reg.test(value) == false) {
        callback(
            new Error("格式必须为数字，只能有一个小数点，小数点后面不能超过2位")
        );
    } else {
        callback();
    }
}
// 英文验证
export function checkEnglish(rule, value, callback) {
    let reg = /^[A-Za-z ]+$/;
    if (!value) {
        return callback(new Error("不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("格式不正确"));
    } else {
        callback();
    }
}
// 用户名验证
export function checkUserName(rule, value, callback) {
    const reg = /^[0-9a-zA-Z_@.]{6,30}$/; //
    if (!value) {
        return callback(new Error("用户名不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("6~30位，英文/数字/下划线/@/."));
    } else {
        callback();
    }
}
// 身份证验证
export function checkIDCard(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!value) {
        return callback(new Error("身份证号码不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("身份证格式错误"));
    } else {
        callback();
    }
}
// 手机号验证
export function checkPhone(rule, value, callback) {
    const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!value) {
        return callback(new Error("手机号不能为空"));
    } else if (reg.test(value) == false) {
        callback(new Error("手机号格式错误"));
    } else {
        callback();
    }
}
// 姓名验证
export function checkName(rule, value, callback) {
    if (!value) {
        return callback(new Error("姓名不能为空"));
    } else {
        callback();
    }
}
// 为空验证
export function checkEmpty(rule, value, callback) {
    if (!value) {
        return callback(new Error("不能为空"));
    } else {
        callback();
    }
}

const red = "#f56c6c";
const green = "#67c23a";
const grey = "#d9d9d9";
const yellow = "#e6a23c";
const wechat_icon = "icon-wechat";
const alipay_icon = "icon-alipay";
const yinlian_icon = "icon-yinlian";

// 已激活 未激活
export function checkActivation(val = "") {
    let color = "";
    let text = "";
    let icon = "";
    switch (val) {
        case 1:
            text = "已激活";
            color = green;
            icon = "yijihuo";
            break;
        case -1:
            text = "未激活";
            color = red;
            icon = "weijihuo";
            break;
        default:
            text = "暂无数据";
            icon = "";
    }
    return { color, text, icon };
}
// 已报名 未报名
export function checkEntry(val = "") {
    let color = "";
    let text = "";
    let icon = "";
    switch (val) {
        case 1:
            text = "已报名";
            color = green;
            icon = "yijihuo";
            break;
        case -1:
            text = "未报名";
            color = yellow;
            icon = "weijihuo";
            break;
        default:
            text = "暂无数据";
            icon = "";
    }
    return { color, text, icon };
}
// 未审核 驳回 已通过
export function checkExamine(val = "") {
    let color = "";
    let text = "";
    let icon = "";
    switch (val) {
        case 1:
            text = "已通过";
            color = green;
            icon = "yijihuo";
            break;
        case 0:
            text = "未审核";
            color = yellow;
            icon = "weijihuo";
            break;
        case -1:
            text = "驳回";
            color = red;
            icon = "weijihuo";
            break;
        default:
            text = "暂无数据";
            icon = "";
    }
    return { color, text, icon };
}
// 更新 新增 删除
export function checkEvent(val = "") {
    let text = "";
    let type = "";
    switch (val) {
        case "update":
            text = "更新";
            type = "primary";
            break;
        case "delete":
            text = "删除";
            type = "danger";
            break;
        case "create":
            text = "新增";
            type = "success";
            break;
        default:
            text = "暂无数据";
            type = "";
    }
    return { text, type };
}

import axios from 'common/js/http';

// 登录
export function login(data) {
    return axios.get(`../../static/mock/login.json`, data).then(res => {
        return Promise.resolve(res);
    });
}
// 退出登录
export function logout() {
    return axios.get(`../../static/mock/login.json`).then(res => {
        return Promise.resolve(res);
    });
}
// 验证码
export function captcha() {
    return axios.get(`../../static/mock/captcha.json`).then(res => {
        return Promise.resolve(res);
    });
}
// 验证密码
export function psdValidate(data) {
    return axios.post(`../../static/mock/login.json`,data).then(res => {
        return Promise.resolve(res);
    });
}
// 获取用户信息
export function getUserInfoAjax() {
    return axios({
        url: `../../static/mock/userinfo.json`,
        method: 'get'
    });
}

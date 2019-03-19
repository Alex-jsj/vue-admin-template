import axios from 'axios';

import { Message } from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    // baseURL: process.env.API_ROOT,
    timeout: 10000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
    config => {
        config.data && (config.data = qs.stringify(config.data));
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// respone拦截器
service.interceptors.response.use(
    response => {
        // 如果code不存在则返回正确数据 code存在则是各种失败状态
        if (response.data.code == 200) {
            return response.data;
        } else {
            Message.error(`发生了错误：${response.data.code} - ${response.data.message}`);
            return false;
        }
    },
    error => {
        Message({
            message: `服务器错误：${error.response.status}
             - 
            ${error.response.statusText}`,
            type: 'error'
        });
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);

export default service;

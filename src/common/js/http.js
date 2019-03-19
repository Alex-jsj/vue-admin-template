/*
 * @Author: alex (chenzeyongjsj@163.com)
 * @Date: 2018-11-17 02:20:12
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-12-01 22:35:06
 */
import axios from 'axios';
import qs from 'qs';

import { Message, MessageBox } from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    baseURL: process.env.API_ROOT,
    // async: false,
    timeout: 5000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
    config => {
        // qs序列化
        config.data && (config.data = qs.stringify(config.data));
        // 请求头部带上token
        localStorage.getItem('admin_token') &&
            (config.headers.Authorization = `token ${localStorage.getItem(
                'admin_token'
            )}`);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.data) {
            // 如果code为200则返回正确数据
            if (response.data.code === 200) {
                return response.data;
            } else if (response.data.code == 401) {
                localStorage.removeItem('admin_token');
                MessageBox.confirm('您已离线', '提示', {
                    confirmButtonText: '重新登录',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning'
                }).then(() => {
                    location.reload(); // 重新实例化vue-router对象 避免bug
                });
            }else {
                Message.error(
                    `${response.data.code}  -  ${response.data.message}`
                );
                return false;
            }
        } else {
            return false;
        }
    },
    error => {
        if (
            error.code === 'ECONNABORTED' &&
            error.message.indexOf('timeout') !== -1
        ) {
            // 请求超时
            Message({
                message: '请求超时',
                type: 'error'
            });
        }
        if (error.response.status === 404) {
            Message({
                message: `${error.response.status} - ${
                    error.response.statusText
                }`,
                type: 'error'
            });
        } else if (error.response.status === 401) {
            localStorage.removeItem('admin_token');
            MessageBox.confirm('您已离线', '提示', {
                confirmButtonText: '重新登录',
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'warning'
            }).then(() => {
                location.reload(); // 重新实例化vue-router对象 避免bug
            });
        } else {
            Message({
                message: `服务器错误：${error.response.status}
                  - 
                ${error.response.statusText}`,
                type: 'error'
            });
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);

export default service;

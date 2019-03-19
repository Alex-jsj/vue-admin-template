/*
 * @Author: alex (chenzeyongjsj@163.com)
 * @Date: 2018-12-26 23:04:10
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2019-01-16 00:28:30
 */
// 权限控制

import router from './router';
import store from './store';

// 根据权限列表配置路由
import set_premission from 'common/setPremission';

// 网页加载进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({
    showSpinner: false
}); // NProgress Configuration

const whiteList = ['/login', '/404']; // 免登录白名单

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    if (localStorage.getItem('admin_token')) {
        // 有登录标记
        if (to.path == '/login') {
            //如果当前页面在登录页
            if (tokenTime()) {
                // 前端存储的登录时间未过期
                if (store.state.role === '') {
                    // 当前用户还未拉取完user_info信息
                    store.dispatch('getUserInfo').then(res => {
                        router.addRoutes(
                            set_premission(store.getters.GenerateRoutes)
                        ); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
                    });
                } else {
                    next('/pages/index');
                }
            } else {
                // 前端存储的登录时间已过期
                next();
            }
        } else {
            if (store.state.role === '') {
                store
                    .dispatch('getUserInfo')
                    .then(res => {
                        router.addRoutes(
                            set_premission(store.getters.GenerateRoutes)
                        ); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
                    })
                    .catch(err => {
                        localStorage.removeItem('admin_token');
                        next('/login');
                    });
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done();
        }
    }
});

// 判断token是否过期
function tokenTime() {
    let time = localStorage.getItem('admin_token_time') || null;
    if (time) {
        const now = new Date().getTime();
        time = now - time < 1000 * 60 * 60 * 2; // 时间是否还未超过2小时
    } else {
        time = false; // 不存在则设置为超时
    }
    return time;
}

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

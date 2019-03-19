import Vue from 'vue';
import Vuex from 'vuex';

import tagsView from './modules/tagsView';

import { getUserInfoAjax } from 'api/login'; // ajax api
import { superAdmin } from '@/router/menu'; // 菜单

// 路由配置
import rootConfig from '@/router/modules/root'; // 系统管理员

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tagsView
    },
    state: {
        menuCollapse: false, //菜单展开收起
        menuFixed: false, //固定导航
        isMenuDark: false, //深色系菜单
        menuType: 1, //导航模式
        contentWidthType: '流式', //内容宽度
        nickName: '', // 昵称
        account: '', // 账号
        token: '', // token
        head_img: './static/img/head.png', // 头像
        unread: '', // 未读消息
        role: '', // 用户角色组
        menu: [] // 用户路由表
    },
    getters: {
        visitedViews: state => state.tagsView.visitedViews,
        cachedViews: state => state.tagsView.cachedViews,
        // 根据权限动态加载菜单
        GenerateRoutes: state => {
            if (state.role === '超级管理员') {
                return rootConfig;
            } else if (state.role === '无权限用户') {
                return noRoleConfig;
            }
        }
    },
    mutations: {
        // 菜单展开收起
        SET_MENU_COLLAPSE: function(state, new_menuCollapse) {
            this.state.menuCollapse = new_menuCollapse;
        },
        // 菜单展开收起
        SET_MENU_FIXED: function(state, new_menuFixed) {
            this.state.menuFixed = new_menuFixed;
        },
        // 菜单主题色
        SET_THEME: function(state, new_isMenuDark) {
            this.state.isMenuDark = new_isMenuDark;
        },
        // 导航模式
        SET_MENUTYPE: function(state, new_menuType) {
            this.state.menuType = new_menuType;
        },
        // 内容宽度
        SET_CONTENTWIDTH: function(state, new_contentWidthType) {
            this.state.contentWidthType = new_contentWidthType;
        },
        // 角色
        SET_ROLE: function(state, new_role) {
            this.state.role = new_role;
        },
        // token
        SET_TOKEN: function(state, new_token) {
            this.state.token = new_token;
        },
        // 菜单
        SET_MENU: function(state, new_menu) {
            this.state.menu = new_menu;
        },
        // 昵称
        SET_NICK_NAME: function(state, new_nickName) {
            this.state.nickName = new_nickName;
        },
        // 账号
        SET_ACCOUNT: function(state, new_account) {
            this.state.account = new_account;
        },
        // 未读信息
        SET_UNREAD: function(state, new_unread) {
            this.state.unread = new_unread;
        }
    },
    actions: {
        // 获取用户信息
        getUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfoAjax()
                    .then(res => {
                        if (res.code === 200) {
                            const respon = res.data || '';
                            if (respon.role === 'super') {
                                commit('SET_ROLE', '超级管理员'); // 存储用户角色
                                commit('SET_MENU', superAdmin); // 存储用户菜单
                            } else {
                                commit('SET_ROLE', '无权限用户');
                                commit('SET_MENU', noRole);
                            }
                            commit('SET_NICK_NAME', respon.nickName); // nickName
                            commit('SET_ACCOUNT', respon.account); // account
                            commit('SET_UNREAD', respon.unread); // 未读消息
                        }
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
});

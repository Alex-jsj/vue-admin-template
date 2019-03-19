import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

//Axios
import axios from 'axios';
Vue.prototype.$http = axios; // 通过修改原型链，来更方便的使用

// JsonP
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import introJS from "intro.js";
import 'intro.js/introjs.css';
Vue.prototype.$intro = introJS;

// 自定义滚动条
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);

//引入外部资源
import './assets/css/reset.css'; // css reset
import './assets/css/element-ui.css'; // elementUI 组件样式覆盖
import './assets/css/public.css'; // 公用样式
import './assets/iconfont/iconfont.css'; // 阿里巴巴图标库

// 权限控制
import './permission';

// 百度统计
var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?b11d61857ddbc0ae7e199bcf3b875274';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
})();

// Vue.prototype.$echo = echo;

Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示
// Vue.config.silent = true; // 取消 Vue 所有的日志与警告

new Vue({
    el: '#App',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});

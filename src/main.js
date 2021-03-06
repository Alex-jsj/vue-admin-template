import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

//Axios
import axios from 'axios';
Vue.prototype.$http = axios; // 添加到vue的原型链，来更方便的使用

// JsonP
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

// 国际化
import i18n from './i18n';

//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
    size: 'mini',
    i18n: (key, value) => i18n.t(key, value)
});

// 引导组件
import introJS from 'intro.js';
import 'intro.js/introjs.css';
Vue.prototype.$intro = introJS;

import VueCropper from 'vue-cropper'; // 图片裁剪
Vue.use(VueCropper);

// 自定义滚动条
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);

// 第一个是videoJs的样式，后一个是vue-video-player的样式，考虑到其他业务组件可能也会用到视频播放，所以放在main.js
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
//把VueVideoPlayer导入并挂在到vue上
import VideoPlayer from 'vue-video-player';
// import 'videojs-flash'; // 引入才能播放rtmp视频
// import 'videojs-contrib-hls'; // 引入才能播放m3u8文件
Vue.use(VideoPlayer);

//引入外部资源
import './assets/css/reset.css'; // css reset
import './assets/css/element-ui.css'; // elementUI 组件样式覆盖
import './assets/css/public.css'; // 公用样式
import './assets/iconfont/iconfont.css'; // 阿里巴巴图标库

// 权限控制
import './permission';

// Vue.prototype.$echo = echo;

Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示
// Vue.config.silent = true; // 取消 Vue 所有的日志与警告

new Vue({
    el: '#App',
    router,
    store,
    i18n,
    components: {
        App
    },
    template: '<App/>'
});

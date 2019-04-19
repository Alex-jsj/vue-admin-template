import Vue from 'vue';

// 头像
Vue.filter('avatar', function(value) {
    if (value) return value;
    return require('../../static/img/head.png');
});

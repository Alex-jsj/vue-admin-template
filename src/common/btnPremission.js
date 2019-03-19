import Vue from 'vue';

/**权限指令**/
const has = Vue.directive('has', {
    bind: function(el, binding, vnode) {
        // 获取页面按钮权限
        if (vnode.context.$route.meta.permissions) {
            const btnPermissionsArr = vnode.context.$route.meta.permissions;
            if (!(btnPermissionsArr.indexOf(binding.arg) > -1)) {
                el.parentNode.removeChild(el);
            }
        }
    }
});
export { has };

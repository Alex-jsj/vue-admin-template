import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// 无需权限亦可访问
export const publicRouter = [
    {
        path: "/redirect",
        component: () => import("@/views/public/index"),
        // hidden: true,
        children: [
            {
                path: "/redirect/:path*",
                component: () => import("@/views/redirect/index")
            }
        ]
    },
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: () => import("@/views/login")
    },
    {
        path: "/404",
        component: () => import("@/views/404")
    }
];

export default new Router({
    // 保留浏览位置
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    },
    routes: publicRouter
});

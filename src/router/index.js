import Vue from "vue";
import VueRouter from "vue-router";
// import LoginRoute from "./loginroutes";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/reg",
      name:'Reg',
      component: () => import("../pages/reg"),
      meta: {
        title: "注册",
        isShowFooter: false,
        isShowTopbar:true,
      },
    },
    {
      path: "/login",
      name:'Login',
      component: () => import("../pages/login"),
      meta: {
        title: "登录",
        isShowFooter: false,
        isShowTopbar:true,
      },
    },
    // LoginRoute,
    {
      path: "/home",
      name: "Home",
      meta: {
        title: "首页",
        isShowFooter: true,
      },
      component: () => import("../pages/home"),
    },
    {
      path: "/detail/:id",
      name: "Detail",
      meta: {
        title: "详情页",
        isShowFooter: false,
        
      },
      component: () => import("../pages/detail"),
    },
    {
      path: "/order",
      name: "Order",
      meta: {
        title: "订单",
        isShowFooter: false,
        isShowTopbar:true,
      },
      component: () => import("../pages/order"),
    },
    {
      path: "/fenlei",
      name: "Fenlei",
      meta: {
        title: "分类",
        isShowFooter: true,
        
      },
      component: () => import("../pages/fenlei"),
    },
    {
      path: "/cart",
      name: "Cart",
      meta: {
        title: "购物车",
        isShowFooter: true,
      },
      component: () => import("../pages/cart"),
    },
    {
      path: "/address",
      name: "Address",
      meta: {
        title: "添加信息",
        isShowFooter: false,
        isShowTopbar:true,
      },
      component: () => import("../pages/address"),
    },
    {
      path: "/mine",
      name: "Mine",
      meta: {
        title: "我的",
        isShowFooter: true,
      },
      component: () => import("../pages/mine"),
    },
    {
      path: "/reviseUserInfo",
      name: "ReviseUserInfo",
      meta: {
        title: "修改个人信息",
        isShowFooter: true,
        isShowTopbar:true,
      },
      component: () => import("../pages/reviseuserinfo"),
    },
    {
      path: "/editPass",
      name: "EditPass",
      meta: {
        title: "修改密码",
        isShowFooter: true,
        isShowTopbar:true,
      },
      component: () => import("../pages/editPass"),
    },
    
  ],
});

export default router;

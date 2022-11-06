import axios from "axios";
import { Notify } from "vant";
import { getToken } from "./auth";
// import { Route } from "vue-router";
import router from "@/router";

const instance = axios.create({
  baseURL: "https://nodeapi.lanlianhua.work", // 接口域名
  timeout: 10000, // 请求超时时间
});

//全局请求拦截
instance.interceptors.request.use(
  function (config) {
    // 看看有没有token，如果有的话，设置请求头
    if (getToken("token")) {
      config.headers.authorization = `Bearer ${getToken("token")}`;
    }
    //手机端用这个，手机端没有cookies
    // if (localStorage.getItem('token')) {
    //   config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { status } = error.response;
    console.log(111, status);
    Notify({ type: "warning", message: "未授权请先登录" });
    // 如果无权限直接打回登陆页面
    router.push({name:'Login'})
    return Promise.reject(error);
  }
);

// 封装post请求
export const post = (url, data) => instance.post(url, data);
// 封装get请求
// axios.get(url,{params:{}})
export const get = (url, params) => instance.get(url, { params });

// 封装删除功能
export const del = (url, params) => instance.delete(url, { params });
export default instance;

import { get } from "../util/request";

// 轮播图
export const reqBanners = () => get("/api/v1/products");

// 商品列表
export const reqProducts = (data) => get("/api/v1/products", data);

// 根据id获取详情
export const reqDetail = (id) => get(`/api/v1/products/${id}`);

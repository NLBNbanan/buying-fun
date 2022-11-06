import { get } from "../util/request";
// 获取所有的分类列表
export const loadcategorys = () => get("/api/v1/product_categories");

// 获取分类对应的商品
export const loadProductsByCategory = (name) =>
  get("/api/v1/products?name=" + name);

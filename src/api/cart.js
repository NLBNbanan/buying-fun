import { get, post, del } from "../util/request";
// 添加购物车
// 商品的id和商品的数量
export const addToCart = (id, num = 1) =>
  post("/api/v1/shop_carts", {
    product: id,
    quantity: num,
  });

//   获取购物车列表
export const reqCartListAPI = () => get("/api/v1/shop_carts");

// 根据id删除购物车
export const reqDeletecartAPI = (id) => del(`/api/v1/shop_carts/${id}`);

// 删除多个
export const reqDeletecartsAPI = (ids) =>
  post("/api/v1/shop_carts/delmany", { ids });

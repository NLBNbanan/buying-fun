import { get, post,del } from "../util/request";

// 提交订单
export const reqSaveOrderAPI = (data) => post("/api/v1/orders", data);

// 获取所有的订单
export const reqOrders = () => get("/api/v1/orders");

//删除订单

export const delOrderAPI =(id)=>del('/api/v1/orders/'+id)

//删除多个订单
export const delOrdermanyAPI =(ids)=>post('/api/v1/orders/delmany',{ids})

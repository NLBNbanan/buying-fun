import instance,{ get,post } from "../util/request";


export const getUserAPI = () => get('/api/v1/users/info');
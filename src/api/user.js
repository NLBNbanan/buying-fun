import instance, { post } from "../util/request";

// export const reqRegister = (data) => {
//   // axios({})
//   return instance({
//     url: "/api/v1/auth/reg",
//     method: "post",
//     data,
//   });
// };

export const reqRegister = (data) => post("/api/v1/auth/reg", data);
export const reqLogin = (data) => post("/api/v1/auth/login", data);

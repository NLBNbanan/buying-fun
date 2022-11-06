import Cookies from "js-cookie";

const Token = "token";
export function setToken(token) {
  localStorage.setItem(Token, token);
}

// 获取token
export function getToken() {
  return localStorage.getItem(Token);
}

// 删除
export function removeToken() {
  return localStorage.removeItem(Token); // 移除
}


//上线时要注意区分是手机端还是PC端，手机端没有cookies，要用本地存储

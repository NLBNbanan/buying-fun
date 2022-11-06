import { get, post, del } from "../util/request";

//上传头像
export const uploadAvatarAPI = (data) =>
  post("/api/v1/common/file_upload", data);

//修改个人信息
export const changeinfoAPI = (data) =>
  post("/api/v1/users/change_info",data);

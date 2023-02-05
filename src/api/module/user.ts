import { ElMessage } from "element-plus";

import request from "@/utils/request1";

export const loginApi = async (data: any) => {
  return await request({
    url: "/user/login",
    method: "post",
    data: data,
  });
};

export const getEmailCodeApi = async (data: any) => {
  return await request({
    url: "/user/getEmailCode",
    method: "post",
    data: data,
  });
};

export const registerApi = async (data: any) => {
  return await request({
    url: "/user/rigister",
    method: "post",
    data: data,
  });
};

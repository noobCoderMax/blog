import { ElMessage } from "element-plus";

import request from "@/utils/request1";

export const uploadBlogApi = (data: any) => {
  return request({
    url: "blog/create",
    method: "post",
    params: data,
  });
};

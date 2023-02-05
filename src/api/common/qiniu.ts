import axios from "axios";
const server = axios.create({
  baseURL: "http://localhost:3333",
});

export const upload_qiniu = () =>
  server.get("api/qntoken").then((res) => res.data);

export const domain: string = "http://upload-z1.qiniup.com";
export const uploadUrl: string = "rla2pexuc.hb-bkt.clouddn.com";

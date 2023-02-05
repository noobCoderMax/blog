import axios from "axios";
const server = axios.create({
  baseURL: "http://localhost:3333",
});
export const getSvg = () => server.get("/api/codeImg").then((res) => res.data);

export const upload_qiniu = () =>
  server.get("api/qntoken").then((res) => res.data);

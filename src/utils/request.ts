import axios, { AxiosRequestConfig } from "axios";
type Method = "GET" | "POST" | "PUT" | "DELETE";
type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

interface axiosRequest {
  baseUrl?: string;
  timeout: number;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  responseType?: ResponseType;
}

interface CustomResponse {
  readonly status: boolean;
  readonly message: string;
  data: any;
  origin?: any;
}

const request = axios.create({
  // baseURL: "",
  timeout: 5000,
});

request.interceptors.request.use();

request.interceptors.response.use();

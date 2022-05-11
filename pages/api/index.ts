import Axios , { HeadersDefaults , AxiosRequestHeaders} from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});


interface MyRequiredHeaders {
    authorization: AxiosRequestHeaders;
    cookie: AxiosRequestHeaders;
    'og-hmac': AxiosRequestHeaders;
    'x-csrftoken': AxiosRequestHeaders;
  }

//* 스토어의 타입
type MyRequiredHeaderDefaults = HeadersDefaults< typeof MyRequiredHeaders>;

export default axios;
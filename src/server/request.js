import axios from "axios";
//node代理服务器可以访问4000
export default req =>
  axios.create({
    baseURL: "http://127.0.0.1:4000",
    headers: {
      cookie: req.get("cookie") || ""
    }
  });

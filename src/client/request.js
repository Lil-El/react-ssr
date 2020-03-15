import axios from "axios";
//客户端只能访问 node代理服务器 3000；不可以直接访问4000端口
export default axios.create({
  baseURL: "/"
});

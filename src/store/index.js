import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

//这里导出的是创建仓库的方法，而不是仓库，因为客户端和服务端不一样
//客户端访问同一个服务端，会公用；所以服务端每次创建仓库，不会冲突
export function getServerStore() {
  return createStore(reducers, applyMiddleware(thunk, logger));
}
export function getClientStore() {
  let initState = window.context.state;
  // createStore第二个参数是初始状态值
  return createStore(reducers, initState, applyMiddleware(thunk, logger));
}

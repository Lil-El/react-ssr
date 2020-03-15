import * as types from "../action-types";

export default {
  getHomeList() {
    // 正是由于redux-thunk才可以派发一个函数
    return function(dispatch, getState, request) {
      //避免每次使用axios，因为每个地方都要使用，所以创建一个创建axios实例的request.js文件
      //客户端不能直接访问4000，node代理可以访问4000，所以要每次请求要区别当前环境
      // 如果每次传入参数来判断，很不方便
      // 所以在中间件中传入不同的axios实例，让他自己判断
      return request.get("/api/users").then(function(result) {
        let list = result.data;
        dispatch({
          type: types.SET_HOME_LIST,
          payload: list
        });
      });
    };
  }
};

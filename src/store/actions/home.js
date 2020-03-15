import * as types from "../action-types";
import axios from "axios";

export default {
  getHomeList() {
    // 正是由于redux-thunk才可以派发一个函数
    return function(dispatch, getState) {
      return axios
        .get("http://127.0.0.1:4000/api/users")
        .then(function(result) {
          let list = result.data;
          dispatch({
            type: types.SET_HOME_LIST,
            payload: list
          });
        });
    };
  }
};

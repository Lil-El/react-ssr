import { combineReducers } from "redux";
import home from "./home";
import counter from "./counter";

let reducers = combineReducers({ counter, home });

export default reducers;

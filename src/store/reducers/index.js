import { combineReducers } from "redux";
import home from "./home";
import counter from "./counter";
import session from "./session";
let reducers = combineReducers({ counter, home, session });

export default reducers;

import React from "react";
import ReactDOM from "react-dom";
import Counter from "../container/Counter";

ReactDOM.hydrate(<Counter />, document.getElementById("root"));
// 由于在server.js中，#root已经有了内容，使用render，使其重新渲染了，发生警告，并在react v17.0中进行修改；
// 所以要使用hydrate，将Counter组件中有的，#id没有的添加上去
// 解释：#id 有 Counter组件的内容，但是没有事件，使用hydrate将事件添加上去

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import routes from "../routes";
import { Provider } from "react-redux";
import { getServerStore } from "../store";
import { renderRoutes, matchRoutes } from "react-router-config";
export default function(req, res) {
  // let html = renderToString(<Home />);
  // let counter = renderToString(<Counter />);
  //通过路径匹配路由，渲染成字符串
  let context = {};
  let store = getServerStore();
  //判断路由对象和请求路径是否匹配
  // let matchedRoutes = routes.filter(route => matchPath(req.path, route)); // 只有一层路由时，使用这个（即没有components属性）
  let matchedRoutes = matchRoutes(routes, req.path); //可以处理嵌套路由
  let promise = [];

  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promise.push(item.route.loadData(store));
    }
  });
  Promise.all(promise).then(function() {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    // 后端不使用router的话，前端使用router；
    // 虽然前端路由改变，可以显示对应的组件；
    // 但是后端渲染的源代码，都是一样的；
    // 所以后端使用router，更改代码
    res.send(`
    <html>
      <head>  
        <link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <!-- <div id="title">'$html'</div> -->
        <script>
          window.context = {
            state:${JSON.stringify(store.getState())}
          }
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
    `);
  });
}

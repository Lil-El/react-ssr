import React from "react";
import Home from "../container/Home";
import Counter from "../container/Counter";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import routes from "../routes";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getServerStore } from "../store";
export default function(req, res) {
  // let html = renderToString(<Home />);
  // let counter = renderToString(<Counter />);
  //通过路径匹配路由，渲染成字符串
  let context = {};
  let store = getServerStore();
  //判断路由对象和请求路径是否匹配
  let matchRoute = routes.filter(route => matchPath(req.path, route));
  let promise = [];
  matchRoute.forEach(route => {
    if (route.loadData) {
      promise.push(route.loadData(store));
    }
  });
  Promise.all(promise).then(function() {
    let route = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          <>
            <Header />
            <div className="container" style={{ marginTop: "70px" }}>
              {routes.map(route => (
                <Route {...route} />
              ))}
            </div>
          </>
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
        <div id="root">${route}</div>
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

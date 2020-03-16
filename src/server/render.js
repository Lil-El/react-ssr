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
  let context = { csses: [] };
  let store = getServerStore(req);
  //判断路由对象和请求路径是否匹配
  // let matchedRoutes = routes.filter(route => matchPath(req.path, route)); // 只有一层路由时，使用这个（即没有components属性）
  let matchedRoutes = matchRoutes(routes, req.path); //可以处理嵌套路由
  let promises = [];

  console.log(matchedRoutes);
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      // console.log("item.route.loadData:", item.route);
      // promise.push(item.route.loadData(store)); 当其中一个接口出现问题，别的接口都受影响；所以要传入promise，都变成成功
      promises.push(
        new Promise(function(resolve) {
          return item.route.loadData(store).then(resolve, resolve); //使成功和失败的回调都使用resolve
        })
      );
    }
  });

  Promise.all(promises).then(function() {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    if (context.action == "REPLACE") {
      return res.redirect(302, context.url);
      //res.statusCode = 302;
      // 上面两种方式有区别，他们都会改为302，但是使用其中一种后，仍然会请求其他接口；另一个不会
    } else if (context.notFound) {
      res.statusCode = 404;
    }
    let cssStr = context.csses.join("\n"); //使用somiphco-style-loader后，页面可以使用样式，但是，css会抖动。所以要在server端直接插入样式，避免抖动
    // 后端不使用router的话，前端使用router；
    // 虽然前端路由改变，可以显示对应的组件；
    // 但是后端渲染的源代码，都是一样的；
    // 所以后端使用router，更改代码
    res.send(`
    <html>
      <head>
        <title>React-SSR</title>
        <link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        <style>${cssStr}</style>  
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

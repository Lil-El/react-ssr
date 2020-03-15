import React from "react";
const express = require("express");
const app = express();
import Home from "../container/Home";
import Counter from "../container/Counter";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import routes from "../routes";
import Header from "../components/Header";
app.use(express.static("public"));
app.get("*", function(req, res) {
  let html = renderToString(<Home />);
  let counter = renderToString(<Counter />);
  //通过路径匹配路由，渲染成字符串
  let route = renderToString(
    <StaticRouter context={{}} location={req.path}>
      <>
        <Header />
        <div className="container" style={{ marginTop: "70px" }}>
          {routes}
        </div>
      </>
    </StaticRouter>
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
      <!-- <div id="title">${html}</div> -->
      <script src="/client.js"></script>
    </body>
  </html>
  `);
});

app.listen(3000);

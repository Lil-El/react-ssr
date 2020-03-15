import React from "react";
const express = require("express");
import proxy from "express-http-proxy";
const app = express();

import render from "./render";
app.use(express.static("public"));
//访问/api开头的接口，使用4000进行代理
//访问/api/users时，默认去掉/api，访问http://127.0.0.1:4000/users
app.use(
  "/api",
  proxy("http://127.0.0.1:4000", {
    proxyReqPathResolver(req) {
      return `/api${req.url}`;
    }
  })
);
app.get("*", function(req, res) {
  render(req, res);
});

app.listen(3000);

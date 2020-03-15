import React from "react";
const express = require("express");
const app = express();
import Home from "../container/Home";
import Counter from "../container/Counter";
import { renderToString } from "react-dom/server";

app.use(express.static("public"));
app.get("/", function(req, res) {
  let html = renderToString(<Home />);
  let counter = renderToString(<Counter />);
  res.send(`
  <html>
    <body>
      <div id="root">${counter}</div>
      <div id="title">${html}</div>
      <script src="/client.js"></script>
    </body>
  </html>
  `);
});

app.listen(3000);

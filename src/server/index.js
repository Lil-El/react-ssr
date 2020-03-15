import React from "react";
const express = require("express");
const app = express();

import render from "./render";
app.use(express.static("public"));
app.get("*", function(req, res) {
  render(req, res);
});

app.listen(3000);

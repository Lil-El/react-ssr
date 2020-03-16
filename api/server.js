let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "yxd"
  })
);
let users = [
  { id: 1, name: "yxd" },
  { id: 2, name: "yhc" }
];

app.get("/api/users", function(req, res) {
  res.json(users);
});
app.post("/api/login", function(req, res) {
  let user = req.body;
  req.session.user = user;
  res.json({
    code: 0,
    data: {
      user,
      success: "success"
    }
  });
});
app.get("/api/logout", function(req, res) {
  req.session.user = null;
  res.json({
    code: 0,
    data: {
      success: "logout success"
    }
  });
});
app.get("/api/user", function(req, res) {
  let user = req.session.user;
  if (user) {
    res.json({
      code: 0,
      data: {
        user,
        success: "get success"
      }
    });
  } else {
    res.json({
      code: 1,
      data: {
        user,
        error: "not login"
      }
    });
  }
});
app.listen(4000);

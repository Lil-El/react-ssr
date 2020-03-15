let express = require("express");
let cors = require("cors");

let app = express();
let users = [
  { id: 1, name: "yxd" },
  { id: 2, name: "yhc" }
];
app.use(
  cors({
    origin: "http://127.0.0.1:3000"
  })
);
app.get("/api/users", function(req, res) {
  res.json(users);
});
app.listen(4000);

const path = require("path");
const nodeExternal = require("webpack-node-externals");
const base = require("./webpack.base");
const merge = require("webpack-merge");
module.exports = merge(base, {
  target: "node",
  entry: "./src/server/index.js",
  output: {
    path: path.resolve("build"),
    filename: "server.js"
  },
  //检测所有引入的核心模块，告诉webpack不要把核心模块打包到server.js中
  externals: [nodeExternal()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //style-loader在server中没有document，所以使用isomorphic-style-loader代替
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
});

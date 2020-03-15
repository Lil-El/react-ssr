# 笔记

- npm-run-all 执行多个 npm 脚本
- webpack 默认将所有引入的模块进行打包，包含 fs 等；WebpackNodeExternals 将 node 的核心模块（path，fs 等）不会进行打包处理
  用于排除 node_modules 目录下的代码被打包进去，因为放在 node_modules 目录下的代码应该通过 npm 安装
- 服务端只负责首屏的渲染，后面的路由跳转都有前端来完成；不然（也就是说都由后端渲染的话）就是 jst 那种的了
- 后端无法绑定事件，事件必须由前端完成，所有要写一套前端代码，在后端引入

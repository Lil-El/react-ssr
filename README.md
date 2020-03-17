# Abstract

- 服务端只负责首屏的渲染，后面的路由跳转都有前端来完成；不然（也就是说都由后端渲染的话）就是 jsp 那种的了
- 后端无法绑定事件，事件必须由前端完成，所有要写一套前端代码，在后端引入

# Process

- ## 1. 浏览器发送请求
- ## 2. 服务器运行 React 代码生成页面
- ## 3. 服务器返回页面

# Important

> ### 使用 `webpack`，对 client 和 server 代码分别进行打包；在 server 返回的页面中引用 `client.js`

## 1. 事件

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 client 使用 ReactDOM.hydrate，注入事件

## 2. 路由

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用 `react-router-dom` 的 StaticRouter 对 routes 进行渲染，并添加到 HTML 中

## 3. Redux

- 在 store 中返回两个函数，都返回 createStore 方法
- 分别传入到 react-redux 的 Provider 组件的 store 属性中
- 将 server 的 getStore()获得的 store.getState()，绑定到 window.context 上
- 将前端仓库的初始值改为 window.context

## 4. 多级路由

- 引用 react-router-config 的 matchRoutes 和 renderRoutes 方法

## 5. Ajax 请求

- ### 在组件中绑定获取数据的方法

  在需要获取数据的页面的组件上，绑定获取数据的方法；并在 componentDidMount 中获取 store 的数据进行渲染

  > ### componentDidMount 在服务器端是不执行的

  ```javascript
    static loadData = store => {
      return store.dispatch(actions.getHomeList())
    }
  ```

- ### 在 server 中执行方法

  - 在 matchRoutes 的结果中，将所有匹配的 route 进行遍历
  - 将组件上有 loadData 方法的存放到数组中

    > Promise.all 方法全部成功才成功，为避免某个方法执行失败而导致其他数据都无法获取，所以要在数组中添加 promise 对象，并且成功和失败的回调都是成功(resolve)

    ```javascript
    arr.push(
      new Promise((resolve, reject) => {
        return loadData(store);
      }).then(resolve, resolve)
    );
    ```

  - 使用 Promise.all 方法执行所有 promise，成功就立即返回 HTML 字符串

## 6. 404，301 等

- ### 如果访问的路径并不存在，需要在 404 组件上的 componentWillMount 方法中判断 this.props.staticContext，并向 staticContext 添加新属性为 true
  > this.props.staticContext 只有在服务端渲染时，才会有；
- ### 在 server 渲染字符串时，判断 context 的属性，并修改 res 的 statusCode

## 7. Css 服务端渲染

- ### 在 webpack 中配置 style-loader 和 css-loader
  > server 端的 style-loader 没有 document，所以无法生效，需要使用 isomorphic-style-loader 代替
- ### 在使用 styles 的组件中的 componentWillMount 中，将 styles.\_getCss()添加到 staticContext 的某个数组中
- ### 在 server 的 promise.all 方法中，将该数组 join 成字符串，添加到 HTML 字符串的 style 标签中，否则页面的样式可能发生抖动
- ### 为避免所有应用了 styles 的组件中都要写上面的代码，所以写一个高阶组件，完成该过程，并返回原始的组件；这样只需在引用 styles 的组件中调用该组件即可

# Dependency package

- npm-run-all

  `执行多个 npm 脚本`

- webpack-node-externals

  `webpack 默认将所有引入的模块进行打包，包含 fs 等；WebpackNodeExternals 将 node 的核心模块（path，fs 等）不会进行打包处理`

  `用于排除 node_modules 目录下的代码被打包进去，因为放在 node_modules 目录下的代码应该通过 npm 安装`

- react-router-config

  `处理多路由，即路由配置中的routes`

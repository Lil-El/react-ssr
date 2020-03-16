import React from "react";
import Header from "../components/Header";
import routes from "../routes";
import { Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import actions from "../store/actions/session";
import styles from "./App.css";
import withStyles from "../withCss";
class App extends React.Component {
  // componentWillMount() {
  //   if (this.props.staticContext) {
  //     //只有在服务端渲染才有
  //     // _getCss得到处理后的css样式；依靠isomphc-style-loader；在使用了styles的地方都使用这个，避免太多重复代码，编写高阶组件withCss
  //     this.props.staticContext.csses.push(styles._getCss());
  //   }
  // }

  render() {
    return (
      <>
        {/* 在Header的样式中，由于Header不是通过路由渲染的，无法得到staticContext，所以要传入 */}
        <Header staticContext={this.props.staticContext} />
        <div className="container" className={styles.app}>
          {/* {routes.map(route => (
            <Route {...route} />
          ))} */}
          {renderRoutes(this.props.route.routes)}
        </div>
      </>
    );
  }
}
App = withStyles(App, styles);
App.loadData = function(store) {
  console.log("App loadData");
  return store.dispatch(actions.getUser());
};
export default App;

import React from "react";
import Header from "../components/Header";
import routes from "../routes";
import { Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="container" style={{ marginTop: "70px" }}>
          {/* {routes.map(route => (
            <Route {...route} />
          ))} */}
          {renderRoutes(this.props.route.components)}
        </div>
      </>
    );
  }
}

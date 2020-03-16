import React from "react";

export default class NotFound extends React.Component {
  componentWillMount() {
    if (this.props.staticContext) {
      //给context添加属性
      this.props.staticContext.notFound = true;
    }
  }
  render() {
    return <h1>404</h1>;
  }
}

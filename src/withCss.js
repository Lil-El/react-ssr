import React, { Component } from "react";

export default function withStyles(OriginalComponent, styles) {
  class ProxyComponent extends Component {
    //一定要在组件挂载前进行，在Did不生效
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.csses.push(styles._getCss());
      }
    }
    render() {
      return <OriginalComponent {...this.props} />;
    }
  }
  return ProxyComponent;
}

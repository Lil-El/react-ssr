import React, { Component } from "react";

export default class Home extends Component {
  //es7高级语法,绑定在原型上
  state = {
    number: 0
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button
          onClick={() => this.setState({ number: this.state.number + 1 })}
        >
          +
        </button>
      </div>
    );
  }
}

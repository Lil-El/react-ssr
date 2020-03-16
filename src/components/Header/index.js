import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends Component {
  render() {
    return (
      <nva className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">SSR</a>
          </div>
          <div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/counter">计数器</Link>
              </li>
              {this.props.user && (
                <>
                  <li>
                    <Link to="/logout">退出</Link>
                  </li>
                  <li>
                    <Link to="/profile">个人中心</Link>
                  </li>
                </>
              )}
              {!this.props.user && (
                <li>
                  <Link to="/login">登录</Link>
                </li>
              )}
              {this.props.user && (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a>{this.props.user.username}</a>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nva>
    );
  }
}
Header = connect(state => state.session)(Header);
export default Header;

import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/home";

class Home extends Component {
  componentWillMount() {
    //会渲染两次，服务端一次，客户端一次
    if (this.props.list.length === 0) {
      //有了后不需要再次获取，但是浏览器仍然请求了接口
      //是因为clientStore和serverStore不同，需要将serverStore复制到clientStore
      this.props.getHomeList();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul className="list-group">
            {this.props.list.map(item => (
              <li key={item.id} className="list-group-item">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
Home = connect(state => state.home, actions)(Home);
Home.loadData = function(store) {
  return store.dispatch(actions.getHomeList());
};
export default Home;

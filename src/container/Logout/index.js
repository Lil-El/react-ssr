import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/session";
class Logout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-6">
          <button
            onClick={() => {
              this.props.logout();
            }}
          >
            瑞出登录
          </button>
        </div>
      </div>
    );
  }
}
export default connect(state => state.session, actions)(Logout);

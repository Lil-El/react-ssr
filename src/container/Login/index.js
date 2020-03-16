import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/session";
class Login extends React.Component {
  state = { username: "" };
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-6">
          <input
            type="text"
            defaultValue={this.state.username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.props.login({ username: this.state.username });
            }}
          >
            submit
          </button>
        </div>
      </div>
    );
  }
}
Login = connect(state => state.session, actions)(Login);
export default Login;

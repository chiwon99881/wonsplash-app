import LogInContainer from "./LogInContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    usernameLogin: (username: string, password: string) => {
      return dispatch(userActions.usernameLogin(username, password));
    },
    facebookLogin: () => {
      return dispatch(userActions.facebookLogin());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogInContainer);

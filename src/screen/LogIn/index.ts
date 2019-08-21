import LogInContainer from "./LogInContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    usernameLogin: (username: string, password: string) => {
      dispatch(userActions.usernameLogin(username, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogInContainer);

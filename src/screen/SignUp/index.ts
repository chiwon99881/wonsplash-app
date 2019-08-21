import SignUpContainer from "./SignUpContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: () => {
      return dispatch(userActions.facebookLogin());
    },
    registration: (
      username: string,
      password1: string,
      password2: string,
      email: string
    ) => {
      return dispatch(
        userActions.registration(username, password1, password2, email)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpContainer);

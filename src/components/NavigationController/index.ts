import NavigationController from "./NavigationController";
import { connect } from "react-redux";
import { actionCreators } from "../../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { isLoggedIn }
  } = state;
  return {
    isLoggedIn
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(actionCreators.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationController);

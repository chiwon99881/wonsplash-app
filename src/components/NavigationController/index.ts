import NavigationController from "./NavigationController";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { isLoggedIn }
  } = state;
  return {
    isLoggedIn
  };
};

export default connect(mapStateToProps)(NavigationController);

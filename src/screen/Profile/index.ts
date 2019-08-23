import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { username }
      }
    }
  } = ownProps;
  return {
    getProfile: () => {
      dispatch(userActions.getProfile(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

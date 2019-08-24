import EditContainer from "./EditContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username, myProfile }
  } = state;
  const { navigation } = ownProps;
  return {
    username,
    navigation,
    myProfile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMyProfile: () => {
      dispatch(userActions.getMyProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContainer);

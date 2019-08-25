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
    },
    editProfile: (avatar?: string, firstName?: string, lastName?: string) => {
      return dispatch(userActions.editProfile(avatar, firstName, lastName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContainer);

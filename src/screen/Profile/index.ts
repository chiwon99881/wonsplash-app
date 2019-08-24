import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";
import { actionCreators as collectActions } from "../../../redux/modules/collect";

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const {
    user: { profile, username, myLikes },
    collect: { followingImages }
  } = state;
  return {
    navigation,
    profile,
    username,
    myLikes,
    followingImages
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
    },
    getMyLikes: () => {
      dispatch(userActions.getMyLikes());
    },
    getMyFollowingImages: () => {
      dispatch(collectActions.getMyFollowingImages());
    },
    follow: (userId: number) => {
      return dispatch(userActions.follow(userId));
    },
    unfollow: (userId: number) => {
      return dispatch(userActions.unfollow(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

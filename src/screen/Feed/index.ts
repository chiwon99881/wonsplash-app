import FeedContainer from "./FeedContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    collect: { collects },
    user: { username, myProfile }
  } = state;
  return {
    collects,
    username,
    myProfile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feed: () => {
      dispatch(collectActions.feed());
    },
    getMyProfile: () => {
      dispatch(userActions.getMyProfile());
    },
    logout: () => {
      dispatch(userActions.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);

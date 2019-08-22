import FeedContainer from "./FeedContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";
import { actionCreators as userActions } from "../../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    collect: { collects },
    user: { username, profile }
  } = state;
  return {
    collects,
    username,
    profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feed: () => {
      dispatch(collectActions.feed());
    },
    getProfile: (username: string) => {
      dispatch(userActions.getProfile(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);

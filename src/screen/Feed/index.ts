import FeedContainer from "./FeedContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";

const mapStateToProps = (state, ownProps) => {
  const {
    collect: { collects }
  } = state;
  return {
    collects
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feed: () => {
      dispatch(collectActions.feed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);

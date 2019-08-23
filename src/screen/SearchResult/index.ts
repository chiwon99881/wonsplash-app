import SearchResultContainer from "./SearchResultContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";

const mapStateToProps = (state, ownProps) => {
  const {
    navigation,
    navigation: {
      state: {
        params: { searchTerm }
      }
    }
  } = ownProps;
  const {
    collect: { searchCollects }
  } = state;
  return {
    navigation,
    searchTerm,
    searchCollects
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { searchTerm }
      }
    }
  } = ownProps;
  return {
    search: () => {
      dispatch(collectActions.search(searchTerm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultContainer);

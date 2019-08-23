import DetailPhotoContainer from "./DetailPhotoContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";

const mapStateToProps = (state, ownProps) => {
  const {
    collect: { detailCollect }
  } = state;
  return {
    detailCollect
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { imageId }
      }
    }
  } = ownProps;
  return {
    detail: () => {
      dispatch(collectActions.detail(imageId));
    },
    likePhoto: () => {
      dispatch(collectActions.likePhoto(imageId));
    },
    unlikePhoto: () => {
      dispatch(collectActions.unlikePhoto(imageId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPhotoContainer);

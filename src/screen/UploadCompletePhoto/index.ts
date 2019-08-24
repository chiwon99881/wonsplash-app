import UploadCompletePhotoContainer from "./UploadCompletePhotoContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "../../../redux/modules/collect";

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadPhoto: (photoUri: string, tags: any) => {
      return dispatch(collectActions.uploadPhoto(photoUri, tags));
    },
    feed: () => {
      dispatch(collectActions.feed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCompletePhotoContainer);

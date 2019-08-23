import React from "react";
import DetailPhotoPresenter from "./DetailPhotoPresenter";
import { ICollect } from "../../../redux/modules/collect";
import Loader from "../../components/Loader";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  detail: () => void;
  detailCollect: ICollect;
}
interface IState {
  loading: boolean;
  isModalOpen: boolean;
}
class DetailPhotoContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isModalOpen: false
    };
  }

  public componentDidMount() {
    const { detail } = this.props;
    detail();
  }
  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.detailCollect) {
      this.setState({ loading: false });
    }
  };

  public toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { detailCollect, navigation } = this.props;
      const { isModalOpen } = this.state;
      return (
        <DetailPhotoPresenter
          detailCollect={detailCollect}
          navigation={navigation}
          toggleModal={this.toggleModal}
          isModalOpen={isModalOpen}
        />
      );
    }
  }
}

export default DetailPhotoContainer;

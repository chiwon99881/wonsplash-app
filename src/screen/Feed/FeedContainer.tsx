import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ICollect } from "../../../redux/modules/collect";
import Loader from "../../components/Loader";
import FeedPresenter from "./FeedPresenter";
import { IProfile } from "../../../redux/modules/user";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  feed: () => void;
  logout: () => void;
  getMyProfile: () => void;
  myProfile: IProfile;
  collects: ICollect[];
  username: string;
}
interface IState {
  loading: boolean;
}
class FeedContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  public componentDidMount() {
    const { feed, getMyProfile } = this.props;
    feed();
    getMyProfile();
  }

  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.collects && nextProps.myProfile) {
      this.setState({ loading: false });
    }
  };

  public onPresslogout = () => {
    const { logout } = this.props;
    try {
      this.setState({ loading: true });
      logout();
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { myProfile, collects } = this.props;
      return (
        <FeedPresenter
          navigation={navigation}
          my={myProfile}
          logout={this.onPresslogout}
          collects={collects}
        />
      );
    }
  }
}

export default FeedContainer;

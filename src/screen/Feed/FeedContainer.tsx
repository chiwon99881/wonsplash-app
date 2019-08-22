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
  profile: IProfile;
  getProfile: (username: string) => void;
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
    const { feed, getProfile, username } = this.props;
    feed();
    getProfile(username);
  }

  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.collects && nextProps.profile) {
      this.setState({ loading: false });
    }
  };

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { profile, collects } = this.props;
      return (
        <FeedPresenter
          navigation={navigation}
          my={profile}
          collects={collects}
        />
      );
    }
  }
}

export default FeedContainer;

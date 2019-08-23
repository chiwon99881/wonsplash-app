import React from "react";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import ProfilePresenter from "./ProfilePresenter";
import { IProfile } from "../../../redux/modules/user";
import Loader from "../../components/Loader";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getProfile: () => void;
  profile: IProfile;
  username: string;
}
interface IState {
  loading: boolean;
  toggleSelect: string;
}
class ProfileContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      toggleSelect: "photo"
    };
  }

  public componentDidMount() {
    const { getProfile } = this.props;
    getProfile();
  }

  public componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.profile) {
      this.setState({ loading: false });
    }
  };
  public onChangePhoto = () => {
    this.setState({ toggleSelect: "photo" });
  };
  public onChangeLike = () => {
    this.setState({ toggleSelect: "like" });
  };
  public onChangeFollow = () => {
    this.setState({ toggleSelect: "follow" });
  };

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { profile, username } = this.props;
      const { toggleSelect } = this.state;
      return (
        <ProfilePresenter
          currentUser={username}
          profile={profile}
          navigation={navigation}
          onChangePhoto={this.onChangePhoto}
          onChangeLike={this.onChangeLike}
          onChangeFollow={this.onChangeFollow}
          toggleSelect={toggleSelect}
        />
      );
    }
  }
}

export default ProfileContainer;

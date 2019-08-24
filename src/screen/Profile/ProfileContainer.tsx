import React from "react";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import ProfilePresenter from "./ProfilePresenter";
import { IProfile, IMyLikes } from "../../../redux/modules/user";
import Loader from "../../components/Loader";
import { ICollect } from "../../../redux/modules/collect";
import { Alert } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getProfile: () => void;
  getMyLikes: () => void;
  getMyFollowingImages: () => void;
  follow: (userId: number) => Promise<boolean>;
  unfollow: (userId: number) => Promise<boolean>;
  myLikes: IMyLikes[];
  profile: IProfile;
  followingImages: ICollect[];
  username: string;
}
interface IState {
  loading: boolean;
  toggleSelect: string;
  likeLoading: boolean;
}
class ProfileContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      likeLoading: false,
      toggleSelect: "photo"
    };
  }

  public componentDidMount() {
    const { getProfile, getMyLikes, getMyFollowingImages } = this.props;
    getProfile();
    getMyLikes();
    getMyFollowingImages();
  }

  public componentWillReceiveProps = (nextProps, prevState) => {
    if (
      nextProps &&
      nextProps.profile &&
      nextProps.myLikes &&
      nextProps.followingImages
    ) {
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
  public onToggleFollowButton = async () => {
    const { profile, follow, unfollow } = this.props;
    if (!profile.id) {
      Alert.alert("we need userId! but we didn't provided😰");
      return;
    } else {
      if (profile.is_following) {
        this.setState({ likeLoading: true });
        try {
          const response = await unfollow(profile.id);
          if (!response) {
            Alert.alert("Error occured 😭");
            this.setState({ likeLoading: false });
          } else {
            this.setState({ likeLoading: false });
          }
        } catch (e) {
          console.log(e);
          this.setState({ likeLoading: false });
        }
      } else {
        this.setState({ likeLoading: true });
        try {
          const response = await follow(profile.id);
          if (!response) {
            Alert.alert("Error occured 😭");
            this.setState({ likeLoading: false });
          } else {
            this.setState({ likeLoading: false });
          }
        } catch (e) {
          console.log(e);
          this.setState({ likeLoading: false });
        }
      }
    }
  };

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { profile, username, myLikes, followingImages } = this.props;
      const { toggleSelect, likeLoading } = this.state;
      return (
        <ProfilePresenter
          currentUser={username}
          profile={profile}
          navigation={navigation}
          onChangePhoto={this.onChangePhoto}
          onChangeLike={this.onChangeLike}
          onChangeFollow={this.onChangeFollow}
          toggleSelect={toggleSelect}
          myLikes={myLikes}
          followingImages={followingImages}
          likeLoading={likeLoading}
          onToggleFollowButton={this.onToggleFollowButton}
        />
      );
    }
  }
}

export default ProfileContainer;

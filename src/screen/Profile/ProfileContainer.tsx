import React from "react";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import { View, Text } from "react-native";
import { IProfile } from "../../../redux/modules/user";
import Loader from "../../components/Loader";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getProfile: () => void;
  profile: IProfile;
}
interface IState {
  loading: boolean;
}
class ProfileContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true
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

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <View>
          <Text>{navigation.getParam("username", "nobody")}</Text>
        </View>
      );
    }
  }
}

export default ProfileContainer;

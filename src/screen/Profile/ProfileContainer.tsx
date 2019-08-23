import React from "react";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import { View, Text } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getProfile: () => void;
}
class ProfileContainer extends React.Component<IProps> {
  public render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>{navigation.getParam("username", "nobody")}</Text>
      </View>
    );
  }
}

export default ProfileContainer;

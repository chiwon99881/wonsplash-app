import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { View, Text, TouchableOpacity } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class SignUpContainer extends React.Component<IProps, {}> {
  public render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUpContainer;

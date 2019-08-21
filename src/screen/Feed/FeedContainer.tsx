import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class FeedContainer extends React.Component<IProps, {}> {
  public render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text>Feed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeedContainer;

import React from "react";
import { View, Text } from "react-native";

interface IProps {
  isLoggedIn: boolean;
}
const NavigationController: React.SFC<IProps> = ({ isLoggedIn }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoggedIn ? <Text>LoggedIn</Text> : <Text>LoggedOut</Text>}
    </View>
  );
};

export default NavigationController;

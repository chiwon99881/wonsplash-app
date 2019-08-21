import React from "react";
import { View, Text } from "react-native";
import AuthNavigation from "../../navigation/AuthNavigation";

interface IProps {
  isLoggedIn: boolean;
}
const NavigationController: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Logged In</Text>
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default NavigationController;

import React from "react";
import { View, Text } from "react-native";
import AuthNavigation from "../../navigation/AuthNavigation";

interface IProps {
  isLoggedIn: boolean;
}
const NavigationController: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <View>
      <Text>LoggedIn</Text>
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default NavigationController;

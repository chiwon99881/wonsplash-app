import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthNavigation from "../../navigation/AuthNavigation";

interface IProps {
  isLoggedIn: boolean;
  logout: any;
}
const NavigationController: React.SFC<IProps> = ({ isLoggedIn, logout }) => {
  return isLoggedIn ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={logout}>
        <Text>Logged In</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default NavigationController;

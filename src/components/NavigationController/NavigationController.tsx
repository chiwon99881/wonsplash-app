import React from "react";
import AuthNavigation from "../../navigation/AuthNavigation";
import RootNavigation from "../../navigation/RootNavigation";

interface IProps {
  isLoggedIn: boolean;
}
const NavigationController: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <RootNavigation /> : <AuthNavigation />;
};

export default NavigationController;

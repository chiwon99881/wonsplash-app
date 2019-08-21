import { createAppContainer, createStackNavigator } from "react-navigation";
import MainNavigation from "./MainNavigation";

const RootNavigation = createStackNavigator(
  {
    MainNavigation
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(RootNavigation);

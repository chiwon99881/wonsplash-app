import { createStackNavigator } from "react-navigation";
import Feed from "../screen/Feed";
import hasHeaderNavigation from "./hasHeaderNavigation";
import Profile from "../screen/Profile";

const MainNavigation = createStackNavigator(
  {
    Feed,
    hasHeaderNavigation,
    Profile
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;

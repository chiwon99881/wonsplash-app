import { createStackNavigator } from "react-navigation";
import Feed from "../screen/Feed";
import hasHeaderNavigation from "./hasHeaderNavigation";

const MainNavigation = createStackNavigator(
  {
    Feed,
    hasHeaderNavigation
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;

import { createAppContainer, createStackNavigator } from "react-navigation";
import MainNavigation from "./MainNavigation";
import DetailPhoto from "../screen/DetailPhoto";

const RootNavigation = createStackNavigator(
  {
    MainNavigation,
    DetailPhoto: {
      screen: DetailPhoto
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(RootNavigation);

import { createStackNavigator } from "react-navigation";
import Feed from "../screen/Feed";
import HasHeaderNavigation from "./HasHeaderNavigation";
import Profile from "../screen/Profile";
import UploadPhoto from "../screen/UploadPhoto";
import UploadCompletePhoto from "../screen/UploadCompletePhoto";
const MainNavigation = createStackNavigator(
  {
    Feed,
    HasHeaderNavigation,
    Profile,
    UploadPhoto,
    UploadCompletePhoto
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;

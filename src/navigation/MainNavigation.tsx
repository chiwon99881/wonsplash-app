import { createStackNavigator } from "react-navigation";
import Feed from "../screen/Feed";
import HasHeaderNavigation from "./HasHeaderNavigation";
import Profile from "../screen/Profile";
import UploadPhoto from "../screen/UploadPhoto";
import UploadCompletePhoto from "../screen/UploadCompletePhoto";
import Edit from "../screen/Edit";

const MainNavigation = createStackNavigator(
  {
    Feed,
    HasHeaderNavigation,
    Profile,
    UploadPhoto,
    UploadCompletePhoto,
    Edit
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;

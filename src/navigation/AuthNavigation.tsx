import { createAppContainer, createStackNavigator } from "react-navigation";
import LogIn from "../screen/LogIn";
import SignUp from "../screen/SignUp";

const AuthNavigation = createStackNavigator(
  {
    LogIn,
    SignUp
  },
  {
    headerMode: "none",
    mode: "card"
  }
);

export default createAppContainer(AuthNavigation);

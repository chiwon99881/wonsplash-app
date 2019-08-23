import { createStackNavigator } from "react-navigation";
import Search from "../screen/Search/Search";
import SearchResult from "../screen/SearchResult";

export default createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        headerStyle: {
          height: 60,
          backgroundColor: "#FBFBFB"
        }
      }
    },
    SearchResult: {
      screen: SearchResult,
      navigationOptions: {
        headerTintColor: "black"
      }
    }
  },
  {
    mode: "card",
    headerBackTitleVisible: false
  }
);

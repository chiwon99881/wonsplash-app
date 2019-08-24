import React from "react";
import { AppLoading } from "expo";
import {
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// PersistGate 는 리덕스 스토어에서 모든 내용을 불러오기 전까지는 앱을 열어주지 않는 아이
import configureStore from "./redux/configureStore";
import NavigationController from "./src/components/NavigationController";
const { persistor, store } = configureStore();

interface IState {
  preLoading: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      preLoading: true
    };
  }

  public preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
        ...SimpleLineIcons.font,
        ...FontAwesome.font,
        ...MaterialIcons.font
      });
      await Asset.loadAsync([
        require("./assets/logo.png"),
        require("./assets/noPhoto.jpg"),
        require("./assets/noSearch.png")
      ]);
      this.setState({
        preLoading: false
      });
    } catch (e) {
      throw Error(e);
    }
  };

  public componentDidMount() {
    this.preLoad();
  }

  public render() {
    const { preLoading } = this.state;
    if (preLoading) {
      return <AppLoading />;
    } else {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationController />
          </PersistGate>
        </Provider>
      );
    }
  }
}

export default App;

import React from "react";
import { AppLoading } from "expo";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

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
    await Font.loadAsync({
      ...Ionicons.font
    });
    await Asset.loadAsync([
      require("./assets/logo.png"),
      require("./assets/noPhoto.jpg"),
      require("./assets/noSearch.png")
    ]);
    this.setState({
      preLoading: false
    });
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
        <View>
          <Text>App</Text>
        </View>
      );
    }
  }
}

export default App;

import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import LogInPresenter from "./LogInPresenter";
import { Alert } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  usernameLogin: (username: string, password: string) => Promise<boolean>;
  facebookLogin: () => Promise<boolean>;
}
interface IState {
  username: string;
  password: string;
  loading: boolean;
}
class LogInContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  public changeUsername = (text: string) => {
    this.setState({ username: text });
  };
  public changePassword = (text: string) => {
    this.setState({ password: text });
  };
  public onSubmitLogin = async () => {
    const { username, password } = this.state;
    const { usernameLogin } = this.props;
    if (username === "" || password === "") {
      Alert.alert("All Fields are required 🙂");
      return;
    } else {
      try {
        this.setState({ loading: true });
        const res = await usernameLogin(username, password);
        if (!res) {
          this.setState({ loading: false });
          Alert.alert("Something Wrong 😥");
        }
      } catch (e) {
        Alert.alert(e.message);
        console.log(e);
      }
    }
  };
  public onFacebookLogin = async () => {
    const { facebookLogin } = this.props;
    try {
      this.setState({ loading: true });
      const res = await facebookLogin();
      if (!res) {
        this.setState({ loading: false });
        Alert.alert("Something Wrong 😥");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  public render() {
    const { navigation } = this.props;
    const { username, password, loading } = this.state;
    return (
      <LogInPresenter
        navigation={navigation}
        username={username}
        password={password}
        loading={loading}
        changeUsername={this.changeUsername}
        changePassword={this.changePassword}
        onSubmitLogin={this.onSubmitLogin}
        facebookLogin={this.onFacebookLogin}
      />
    );
  }
}

export default LogInContainer;

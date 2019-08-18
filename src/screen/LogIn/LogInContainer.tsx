import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import LogInPresenter from "./LogInPresenter";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
      />
    );
  }
}

export default LogInContainer;

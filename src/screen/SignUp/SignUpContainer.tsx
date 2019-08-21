import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import SignUpPresenter from "./SignUpPresenter";
import { Alert } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  facebookLogin: () => Promise<boolean>;
  registration: (
    username: string,
    password1: string,
    password2: string,
    email: string
  ) => Promise<boolean>;
}
interface IState {
  username: string;
  password1: string;
  password2: string;
  email: string;
  loading: boolean;
}
class SignUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      email: "",
      loading: false
    };
  }

  public changeUsername = (text: string) => {
    this.setState({ username: text });
  };
  public changePassword1 = (text: string) => {
    this.setState({ password1: text });
  };
  public changePassword2 = (text: string) => {
    this.setState({ password2: text });
  };
  public changeEmail = (text: string) => {
    this.setState({ email: text });
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
      this.setState({ loading: false });
    }
  };
  public onSubmitSignUp = async () => {
    const { registration, navigation } = this.props;
    const { username, password1, password2, email } = this.state;
    if (
      username === "" ||
      password1 === "" ||
      password2 === "" ||
      email === ""
    ) {
      Alert.alert("All Fields are required ❗");
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await registration(
        username,
        password1,
        password2,
        email
      );
      if (!response) {
        this.setState({ loading: false });
        return;
      } else {
        this.setState({
          username: "",
          password1: "",
          password2: "",
          email: ""
        });
        Alert.alert("SignUp Success 😍", "Go Login 🤩", [
          { text: "OK", onPress: () => navigation.navigate("LogIn") }
        ]);
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  public render() {
    const { navigation } = this.props;
    const { username, password1, password2, email, loading } = this.state;
    return (
      <SignUpPresenter
        navigation={navigation}
        username={username}
        password1={password1}
        password2={password2}
        email={email}
        loading={loading}
        changeUsername={this.changeUsername}
        changePassword1={this.changePassword1}
        changePassword2={this.changePassword2}
        changeEmail={this.changeEmail}
        facebookLogin={this.onFacebookLogin}
        onSubmitSignUp={this.onSubmitSignUp}
      />
    );
  }
}

export default SignUpContainer;

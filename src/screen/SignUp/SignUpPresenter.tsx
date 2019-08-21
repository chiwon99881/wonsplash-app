import React from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import Theme from "../../../styles/Theme";
import constants from "../../../styles/constants";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
const Logo = styled.View`
  display: flex;
  width: ${constants.width - 30};
  height: ${constants.height / 5};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const Column = styled.View`
  display: flex;
  margin-bottom: 30px;
  width: ${constants.width - 30};
`;
const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  username: string;
  password1: string;
  password2: string;
  email: string;
  loading: boolean;
  changeUsername: (text: string) => void;
  changePassword1: (text: string) => void;
  changePassword2: (text: string) => void;
  changeEmail: (text: string) => void;
  facebookLogin: () => Promise<void>;
  onSubmitSignUp: () => Promise<void>;
}
const SignUpPresenter: React.SFC<IProps> = ({
  navigation,
  username,
  password1,
  password2,
  email,
  loading,
  changeUsername,
  changePassword1,
  changePassword2,
  changeEmail,
  facebookLogin,
  onSubmitSignUp
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView enabled behavior={"padding"} style={{ flex: 1 }}>
        <Container>
          <Logo>
            <Text
              style={{
                fontSize: 40,
                color: Theme.blackFontColor,
                fontWeight: "600"
              }}
            >
              Wonsplash
            </Text>
          </Logo>
          <Column>
            <TouchableOpacity onPress={facebookLogin}>
              <Horizontal
                style={{
                  width: constants.width - 30,
                  backgroundColor: Theme.blueColor,
                  borderRadius: 6,
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={"logo-facebook"}
                  color={Theme.whiteFontColor}
                  size={25}
                />
                <Text style={{ marginLeft: 10, color: Theme.whiteFontColor }}>
                  Continue with Facebook
                </Text>
              </Horizontal>
            </TouchableOpacity>
          </Column>
          <Column style={{ alignItems: "center" }}>
            <Text style={{ color: Theme.greyFontColor }}>OR</Text>
          </Column>
          <Column>
            <TextInput
              width={constants.width - 30}
              value={username}
              placeholder={"Username"}
              onChangeText={changeUsername}
              returnKeyType={"done"}
            />
          </Column>
          <Column>
            <TextInput
              width={constants.width - 30}
              value={password1}
              placeholder={"Password"}
              onChangeText={changePassword1}
              returnKeyType={"done"}
              secureTextEntry={true}
            />
          </Column>
          <Column>
            <TextInput
              width={constants.width - 30}
              value={password2}
              placeholder={"Confirm Password"}
              onChangeText={changePassword2}
              returnKeyType={"done"}
              secureTextEntry={true}
            />
          </Column>
          <Column>
            <TextInput
              width={constants.width - 30}
              value={email}
              placeholder={"email"}
              onChangeText={changeEmail}
              returnKeyType={"done"}
            />
          </Column>
          <Column>
            <TouchableOpacity onPress={onSubmitSignUp}>
              <Button
                bgColor={Theme.blackFontColor}
                loading={loading}
                text={"Sign Up"}
                textBold={false}
                textColor={Theme.whiteFontColor}
                textSize={"15px"}
                width={constants.width - 30}
                padding={10}
              />
            </TouchableOpacity>
          </Column>
          <Column
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Horizontal style={{ marginRight: 5 }}>
              <Text style={{ fontSize: 15 }}>Already have Account ? </Text>
            </Horizontal>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Horizontal>
                <Text style={{ fontSize: 15, color: Theme.blueFollowColor }}>
                  Log In
                </Text>
              </Horizontal>
            </TouchableOpacity>
          </Column>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpPresenter;

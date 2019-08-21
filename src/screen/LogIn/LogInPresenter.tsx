import React from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  KeyboardAvoidingView
} from "react-native";
import Button from "../../components/Button";
import Theme from "../../../styles/Theme";
import constants from "../../../styles/constants";
import TextInput from "../../components/TextInput";
import { Ionicons } from "@expo/vector-icons";

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
  password: string;
  loading: boolean;
  changeUsername: (text: string) => void;
  changePassword: (text: string) => void;
  onSubmitLogin: () => void;
  facebookLogin: () => void;
}
const LogInPresenter: React.SFC<IProps> = ({
  navigation,
  username,
  password,
  loading,
  changeUsername,
  changePassword,
  onSubmitLogin,
  facebookLogin
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
                  Login with Facebook
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
              value={password}
              placeholder={"Password"}
              onChangeText={changePassword}
              returnKeyType={"done"}
              secureTextEntry={true}
            />
          </Column>
          <Column>
            <TouchableOpacity onPress={onSubmitLogin}>
              <Button
                bgColor={Theme.blackFontColor}
                loading={loading}
                text={"Log In"}
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
              <Text style={{ fontSize: 15 }}>Don't have account ? </Text>
            </Horizontal>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Horizontal>
                <Text style={{ fontSize: 15, color: Theme.blueFollowColor }}>
                  Join
                </Text>
              </Horizontal>
            </TouchableOpacity>
          </Column>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LogInPresenter;

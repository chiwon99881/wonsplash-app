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
  Text
} from "react-native";
import Button from "../../components/Button";
import Theme from "../../../styles/Theme";
import constants from "../../../styles/constants";
import TextInput from "../../components/TextInput";

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
}
const LogInPresenter: React.SFC<IProps> = ({
  navigation,
  username,
  password,
  loading,
  changeUsername,
  changePassword
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <TouchableOpacity>
            <Button
              bgColor={Theme.blueColor}
              loading={loading}
              text={"Login with Facebook"}
              textBold={false}
              textColor={Theme.whiteFontColor}
              textSize={"15px"}
              width={constants.width - 30}
              padding={10}
            />
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
          />
        </Column>
        <Column>
          <TouchableOpacity>
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
    </TouchableWithoutFeedback>
  );
};

export default LogInPresenter;

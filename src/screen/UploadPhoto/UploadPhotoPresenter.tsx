import React from "react";
import styled from "styled-components/native";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { ISelect } from "./UploadPhotoContainer";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${constants.width};
  height: 80px;
  margin-top: 8px;
`;
const HeaderTitle = styled.Text`
  font-size: 23px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
`;
const HeaderMeta = styled.Text`
  font-size: 18px;
  color: ${Theme.blackFontColor};
`;
const Horizontal = styled.View`
  display: flex;
  align-items: center;
  margin-top: 8px;
  justify-content: center;
  width: ${constants.width};
  height: 40px;
`;
const Button = styled.View`
  width: ${constants.width - 30};
  border-radius: 8px;
  background-color: ${Theme.blackFontColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Main = styled.View`
  width: ${constants.width};
  height: ${constants.height / 1.5};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const Footer = styled.View`
  display: flex;
  width: ${constants.width};
  flex-direction: row;
  flex-shrink: 1;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  pickImage: () => Promise<void>;
  select: ISelect | null;
}
const UploadPhotoPresenter: React.SFC<IProps> = ({
  pickImage,
  select,
  navigation
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <HeaderTitle>Upload Photo</HeaderTitle>
          <HeaderMeta>👇 Click here to select your photo 👇</HeaderMeta>
        </Header>
        <Horizontal>
          <TouchableOpacity onPress={pickImage}>
            <Button>
              <MaterialIcons name={"photo-camera"} size={40} color={"white"} />
            </Button>
          </TouchableOpacity>
        </Horizontal>
        <Main>
          {select === null ? (
            <Image
              source={require("../../../assets/noSearch.png")}
              style={{ width: constants.width, height: constants.height / 2 }}
            />
          ) : (
            <Image
              source={{ uri: select.uri }}
              style={{
                width: constants.width,
                height: constants.height / 1.5
              }}
              resizeMode={"stretch"}
            />
          )}
        </Main>
        <Footer>
          <TouchableOpacity
            disabled={select === null ? true : false}
            onPress={() =>
              navigation.navigate("UploadCompletePhoto", { selected: select })
            }
          >
            <Button
              style={{
                width: 70,
                padding: 10,
                borderRadius: 6,
                opacity: select === null ? 0.1 : 1
              }}
            >
              <Text style={{ color: Theme.whiteFontColor, fontWeight: "500" }}>
                Next
              </Text>
            </Button>
          </TouchableOpacity>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default UploadPhotoPresenter;

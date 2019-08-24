import React from "react";
import styled from "styled-components/native";
import { NavigationScreenProp } from "react-navigation";
import { NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import { IProfile } from "../../../redux/modules/user";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { ISelect } from "../UploadPhoto/UploadPhotoContainer";
import Avatar from "../../components/Avatar";
import ExTextInput from "../../components/TextInput";
import Button from "../../components/Button";

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;
const Header = styled.View`
  display: flex;
  width: ${constants.width - 30};
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
const HeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
`;
const Body = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 30};
  height: ${constants.height / 1.8};
`;
const BodyLeft = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(constants.width - 30) / 2};
  height: 100%;
`;
const BodyRight = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(constants.width - 30) / 2};
  height: 100%;
`;
const Column = styled.View`
  display: flex;
  width: ${(constants.width - 30) / 2};
  margin-bottom: 10px;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 3px;
  color: ${Theme.blackFontColor};
`;
const Footer = styled.View`
  width: ${constants.width - 30};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  myProfile: IProfile;
  username: string;
  selected: ISelect | null;
  firstName: string;
  lastName: string;
  onChangeFirstName: (text) => void;
  onChangeLastname: (text) => void;
}
const EditPresenter: React.SFC<IProps> = ({
  navigation,
  username,
  myProfile,
  selected,
  firstName,
  lastName,
  onChangeFirstName,
  onChangeLastname
}) => {
  if (username !== myProfile.username) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>❌ You are not Authorized ❌</Text>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTitle>Edit your profile</HeaderTitle>
          </Header>
          <Body>
            <BodyLeft>
              <TouchableOpacity>
                {selected === null ? (
                  <Avatar
                    uri={myProfile.avatar}
                    wid={"100px"}
                    hei={"100px"}
                    rad={"50px"}
                  />
                ) : (
                  <Avatar
                    uri={selected.uri!}
                    wid={"100px"}
                    hei={"100px"}
                    rad={"50px"}
                  />
                )}
              </TouchableOpacity>
            </BodyLeft>
            <BodyRight>
              <Column>
                <Label>First Name</Label>
                <ExTextInput
                  width={(constants.width - 40) / 2}
                  placeholder={"First Name"}
                  onChangeText={onChangeFirstName}
                  value={firstName}
                />
              </Column>
              <Column>
                <Label>Last Name</Label>
                <ExTextInput
                  width={(constants.width - 40) / 2}
                  placeholder={"Last Name"}
                  onChangeText={onChangeLastname}
                  value={lastName}
                />
              </Column>
            </BodyRight>
          </Body>
          <Footer>
            <TouchableOpacity>
              <Button
                text={"Edit"}
                textColor={Theme.whiteFontColor}
                textSize={"18px"}
                textBold={true}
                bgColor={Theme.blackFontColor}
                width={constants.width - 30}
                loading={false}
                padding={10}
              />
            </TouchableOpacity>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
};

export default EditPresenter;

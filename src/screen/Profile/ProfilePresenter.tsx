import React from "react";
import styled from "styled-components/native";
import { NavigationScreenProp, ScrollView } from "react-navigation";
import { NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import { IProfile } from "../../../redux/modules/user";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Alert } from "react-native";
import Avatar from "../../components/Avatar";

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  display: flex;
  padding: 12px;
  height: ${constants.height / 2.2};
  background-color: ${Theme.darkGreyColor};
`;
const HeaderTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${constants.width - 24};
  height: 60px;
`;
const HeaderCenter = styled.View`
  display: flex;
  justify-content: flex-end;
  height: ${constants.height / 2.2 - 140};
  width: ${constants.width - 24};
`;
const HeaderBottom = styled.View`
  display: flex;
  height: 100%;
  flex-shrink: 1;
  justify-content: center;
  width: ${constants.width - 24};
`;
const Username = styled.Text`
  color: ${Theme.whiteFontColor};
  font-weight: 600;
  font-size: 25px;
`;
const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${constants.width};
  height: 50px;
`;
const Toggle = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid black;
  width: ${constants.width - 40};
  height: 35px;
`;
const ToggleButton = styled.View`
  width: ${(constants.width - 40) / 3};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ToggleText = styled.Text`
  font-size: 13px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  profile: IProfile;
  currentUser: string;
  onChangePhoto: () => void;
  onChangeLike: () => void;
  onChangeFollow: () => void;
  toggleSelect: string;
}
const ProfilePresenter: React.SFC<IProps> = ({
  navigation,
  profile,
  currentUser,
  onChangePhoto,
  onChangeLike,
  onChangeFollow,
  toggleSelect
}) => {
  return (
    <Container>
      <Header>
        <HeaderTop>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name={"angle-left"} size={40} color={"white"} />
          </TouchableOpacity>
          {currentUser === profile.username && (
            <TouchableOpacity onPress={() => Alert.alert("Submit Photo")}>
              <Ionicons name={"ios-add"} size={40} color={"white"} />
            </TouchableOpacity>
          )}
        </HeaderTop>
        <HeaderCenter>
          <Avatar uri={profile.avatar} wid={"90px"} hei={"90px"} rad={"45px"} />
        </HeaderCenter>
        <HeaderBottom>
          <Username>{profile.username}</Username>
        </HeaderBottom>
      </Header>
      <Horizontal>
        <Toggle>
          {profile.username === currentUser ? (
            <>
              <ToggleButton
                style={{
                  backgroundColor: toggleSelect === "photo" ? "black" : "white",
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                  borderRightColor: "black",
                  borderRightWidth: 1
                }}
              >
                <TouchableOpacity onPress={onChangePhoto}>
                  <ToggleText
                    style={{
                      color: toggleSelect === "photo" ? "white" : "black"
                    }}
                  >
                    Photos
                  </ToggleText>
                </TouchableOpacity>
              </ToggleButton>
              <ToggleButton
                style={{
                  backgroundColor: toggleSelect === "like" ? "black" : "white",
                  borderRightColor: "black",
                  borderRightWidth: 1
                }}
              >
                <TouchableOpacity onPress={onChangeLike}>
                  <ToggleText
                    style={{
                      color: toggleSelect === "like" ? "white" : "black"
                    }}
                  >
                    Likes
                  </ToggleText>
                </TouchableOpacity>
              </ToggleButton>
              <ToggleButton
                style={{
                  backgroundColor:
                    toggleSelect === "follow" ? "black" : "white",
                  borderTopRightRadius: 9,
                  borderBottomRightRadius: 9,
                  width: (constants.width - 47) / 3
                }}
              >
                <TouchableOpacity onPress={onChangeFollow}>
                  <ToggleText
                    style={{
                      color: toggleSelect === "follow" ? "white" : "black"
                    }}
                  >
                    Follows
                  </ToggleText>
                </TouchableOpacity>
              </ToggleButton>
            </>
          ) : (
            <ToggleButton
              style={{
                width: constants.width - 40,
                backgroundColor: toggleSelect === "photo" ? "black" : "white",
                borderRadius: 9
              }}
            >
              <ToggleText
                style={{ color: toggleSelect === "photo" ? "white" : "black" }}
              >
                Photos
              </ToggleText>
            </ToggleButton>
          )}
        </Toggle>
      </Horizontal>
      <ScrollView />
    </Container>
  );
};

export default ProfilePresenter;

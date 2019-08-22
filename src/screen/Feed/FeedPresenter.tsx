import React from "react";
import styled from "styled-components/native";
import constants from "../../../styles/constants";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ImageBackground, TouchableOpacity } from "react-native";
import { IProfile } from "../../../redux/modules/user";
import { ICollect } from "../../../redux/modules/collect";
import Avatar from "../../components/Avatar";
import Theme from "../../../styles/Theme";

const Container = styled.View`
  flex: 1;
`;
const Horizontal = styled.View`
  display: flex;
  width: ${constants.width};
`;
const Text = styled.Text`
  color: ${Theme.whiteFontColor};
`;
const FakeTextInput = styled.View`
  width: ${constants.width - 30};
  background-color: ${Theme.greyFontColor};
  border-radius: 10px;
  padding: 10px;
  display: flex;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  my: IProfile;
  collects: ICollect[];
}
const FeedPresenter: React.SFC<IProps> = ({ navigation, my, collects }) => {
  return (
    <Container>
      <ImageBackground
        source={{
          uri:
            "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
        }}
        style={{
          width: constants.width,
          height: constants.height / 2.5,
          display: "flex"
        }}
      >
        <Horizontal style={{ padding: 12, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Avatar uri={my.avatar} wid={"40px"} hei={"40px"} rad={"20px"} />
          </TouchableOpacity>
        </Horizontal>
        <Horizontal
          style={{
            height: constants.height / 2.5 / 1.7,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "700", marginBottom: 5 }}>
            Photos for everyone
          </Text>
          <TouchableOpacity>
            <FakeTextInput>
              <Text>🔍 Search photos</Text>
            </FakeTextInput>
          </TouchableOpacity>
        </Horizontal>
        <Horizontal
          style={{
            height: "100%",
            flexShrink: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ opacity: 0.8, fontSize: 13, fontWeight: "500" }}>
            Created by 원이
          </Text>
        </Horizontal>
      </ImageBackground>
    </Container>
  );
};

export default FeedPresenter;

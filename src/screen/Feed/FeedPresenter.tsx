import React from "react";
import styled from "styled-components/native";
import constants from "../../../styles/constants";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import { ImageBackground, TouchableOpacity, Alert } from "react-native";
import { IProfile } from "../../../redux/modules/user";
import { ICollect } from "../../../redux/modules/collect";
import Avatar from "../../components/Avatar";
import Theme from "../../../styles/Theme";
import { SimpleLineIcons } from "@expo/vector-icons";
import Collect from "../../components/Collect";

const Container = styled.View`
  flex: 1;
  min-height: ${constants.height / 2};
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
  opacity: 0.9;
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
        <Horizontal
          style={{
            padding: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => Alert.alert("Wanna Logout ❓")}>
            <SimpleLineIcons name={"logout"} size={27} color={"white"} />
          </TouchableOpacity>
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
      <ScrollView>
        <Horizontal style={{ padding: 15 }}>
          <Text
            style={{
              color: Theme.blackFontColor,
              fontWeight: "500",
              fontSize: 18
            }}
          >
            New
          </Text>
        </Horizontal>
        {collects.map(c => (
          <Collect
            key={c.id}
            id={c.id}
            file={c.file}
            creator={c.creator}
            createdAt={c.natural_time}
            tags={c.tags}
            views={c.views}
            isLiked={c.is_liked}
            likeCount={c.like_count}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default FeedPresenter;

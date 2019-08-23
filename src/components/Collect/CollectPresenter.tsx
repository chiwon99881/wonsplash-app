import React from "react";
// import styled from "styled-components/native";
import { ImageBackground, Alert } from "react-native";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import constants from "../../../styles/constants";
import styled from "styled-components/native";
import Theme from "../../../styles/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const Footer = styled.View`
  width: ${constants.width};
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
`;
const Creator = styled.Text`
  color: ${Theme.whiteFontColor};
  font-weight: 500;
  font-size: 14px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  id: number;
  file: string;
  creator: { id: number; username: string; avatar: string };
  createdAt: string;
  tags: any;
  views: number;
  isLiked: boolean;
  likeCount: number;
}
const CollectPresenter: React.SFC<IProps> = ({
  navigation,
  id,
  file,
  creator,
  createdAt,
  tags,
  views,
  isLiked,
  likeCount
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailPhoto", { imageId: id })}
    >
      <ImageBackground
        source={{ uri: file }}
        resizeMode={"stretch"}
        style={{
          width: constants.width,
          height: constants.height / 2,
          display: "flex",
          justifyContent: "flex-end",
          borderTopColor: Theme.whiteFontColor,
          borderTopWidth: 1
        }}
      >
        <Footer>
          <TouchableOpacity onPress={() => Alert.alert("name")}>
            <Creator>{creator.username}</Creator>
          </TouchableOpacity>
        </Footer>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CollectPresenter;

import React from "react";
import styled from "styled-components/native";
import { NavigationScreenProp, ScrollView } from "react-navigation";
import { NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import { IProfile, IMyLikes } from "../../../redux/modules/user";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import Avatar from "../../components/Avatar";
import Collect from "../../components/Collect";
import { ICollect } from "../../../redux/modules/collect";

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
const HeaderTopRight = styled.View`
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 60px;
  align-items: center;
  justify-content: space-evenly;
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
const NoPhotoView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const NoPhotoImage = styled.Image`
  width: ${constants.width / 1.5};
  height: ${constants.height / 3};
`;
const NoPhotoText = styled.Text`
  color: ${Theme.blackFontColor};
  font-size: 20px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  profile: IProfile;
  myLikes: IMyLikes[];
  followingImages: ICollect[];
  currentUser: string;
  likeLoading: boolean;
  onToggleFollowButton: () => void;
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
  toggleSelect,
  myLikes,
  followingImages,
  likeLoading,
  onToggleFollowButton
}) => {
  return (
    <Container>
      <Header>
        <HeaderTop>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name={"angle-left"} size={37} color={"white"} />
          </TouchableOpacity>
          <HeaderTopRight>
            {currentUser !== profile.username && (
              <TouchableOpacity onPress={onToggleFollowButton}>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 90,
                    padding: 10,
                    backgroundColor: profile.is_following
                      ? Theme.whiteFontColor
                      : Theme.blueFollowColor,
                    borderRadius: 4
                  }}
                >
                  {likeLoading ? (
                    <ActivityIndicator size={"small"} color={"black"} />
                  ) : (
                    <Text
                      style={{
                        color: profile.is_following
                          ? Theme.blackFontColor
                          : Theme.whiteFontColor,
                        fontSize: 15,
                        fontWeight: "500"
                      }}
                    >
                      {profile.is_following ? "Following" : "Follow"}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            {currentUser === profile.username && (
              <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
                <Ionicons name={"ios-settings"} size={33} color={"white"} />
              </TouchableOpacity>
            )}
            {currentUser === profile.username && (
              <TouchableOpacity
                onPress={() => navigation.navigate("UploadPhoto")}
              >
                <Ionicons name={"ios-add"} size={40} color={"white"} />
              </TouchableOpacity>
            )}
          </HeaderTopRight>
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
      <ScrollView>
        {toggleSelect === "photo" ? (
          profile.images.length > 0 ? (
            profile.images.map(c => (
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
            ))
          ) : (
            <NoPhotoView>
              <NoPhotoImage source={require("../../../assets/noSearch.png")} />
              <NoPhotoText>No Photos</NoPhotoText>
            </NoPhotoView>
          )
        ) : null}
        {currentUser === profile.username ? (
          toggleSelect === "like" ? (
            myLikes.length > 0 ? (
              myLikes.map(like => (
                <Collect
                  key={like.id}
                  id={like.image.id}
                  file={like.image.file}
                  creator={like.image.creator}
                  createdAt={like.image.natural_time}
                  tags={like.image.tags}
                  views={like.image.views}
                  isLiked={like.image.is_liked}
                  likeCount={like.image.like_count}
                />
              ))
            ) : (
              <NoPhotoView>
                <NoPhotoImage
                  source={require("../../../assets/noSearch.png")}
                />
                <NoPhotoText>No likes</NoPhotoText>
              </NoPhotoView>
            )
          ) : null
        ) : null}
        {currentUser === profile.username ? (
          toggleSelect === "follow" ? (
            followingImages.length > 0 ? (
              followingImages.map(follow => (
                <Collect
                  key={follow.id}
                  id={follow.id}
                  file={follow.file}
                  creator={follow.creator}
                  createdAt={follow.natural_time}
                  tags={follow.tags}
                  views={follow.views}
                  isLiked={follow.is_liked}
                  likeCount={follow.like_count}
                />
              ))
            ) : (
              <NoPhotoView>
                <NoPhotoImage
                  source={require("../../../assets/noSearch.png")}
                />
                <NoPhotoText>No followings image</NoPhotoText>
              </NoPhotoView>
            )
          ) : null
        ) : null}
      </ScrollView>
    </Container>
  );
};

export default ProfilePresenter;

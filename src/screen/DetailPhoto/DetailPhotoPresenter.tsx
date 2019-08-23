import React from "react";
import { TouchableOpacity, Modal, View } from "react-native";
import styled from "styled-components/native";
import { ICollect } from "../../../redux/modules/collect";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.blackFontColor};
`;
const Top = styled.View`
  width: ${constants.width};
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Center = styled.View`
  width: ${constants.width};
  height: ${constants.height / 1.3};
  align-items: center;
  justify-content: center;
`;
const Bottom = styled.View`
  width: ${constants.width};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  flex-shrink: 1;
`;
const Text = styled.Text`
  color: ${Theme.whiteFontColor};
`;
const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: flex-end;
`;
const Horizontal = styled.View`
  display: flex;
  width: ${constants.width};
  flex-direction: row;
`;
const Vertical = styled.View`
  display: flex;
  width: ${constants.width};
  padding: 0 20px;
`;
const ModalText = styled.Text`
  color: ${Theme.blackFontColor};
`;

interface IProps {
  detailCollect: ICollect;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  toggleModal: () => void;
  toggleLike: () => void;
  isModalOpen: boolean;
}
const DetailPhotoPresenter: React.SFC<IProps> = ({
  detailCollect,
  navigation,
  toggleModal,
  isModalOpen,
  toggleLike
}) => {
  return (
    <Container>
      <Top>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={"ios-close"} size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontWeight: "600", fontSize: 17 }}>
            {detailCollect.creator.username}
          </Text>
        </TouchableOpacity>
      </Top>
      <Center>
        <Image
          source={{ uri: detailCollect.file }}
          resizeMode={"stretch"}
          style={{ width: constants.width, height: constants.height / 1.5 }}
        />
      </Center>
      <Bottom>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons
            name={"ios-information-circle-outline"}
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={"ios-heart"}
            size={30}
            color={
              detailCollect.is_liked ? Theme.redColor : Theme.whiteFontColor
            }
          />
        </TouchableOpacity>
      </Bottom>
      <Modal animationType={"slide"} transparent={true} visible={isModalOpen}>
        <ModalBackground>
          <View
            style={{
              width: constants.width,
              height: constants.height / 2.5,
              backgroundColor: Theme.whiteFontColor,
              borderRadius: 8,
              display: "flex"
            }}
          >
            <Horizontal
              style={{
                height: 40,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={toggleModal}>
                <Ionicons name={"ios-close"} size={40} color={"black"} />
              </TouchableOpacity>
            </Horizontal>
            <Vertical style={{ marginBottom: 10 }}>
              <ModalText style={{ fontSize: 19 }}>{`Published on ${
                detailCollect.natural_time
              }`}</ModalText>
            </Vertical>
            <Horizontal style={{ marginBottom: 10 }}>
              <Vertical style={{ width: constants.width / 2 }}>
                <ModalText>Views</ModalText>
                <ModalText style={{ fontSize: 20, marginTop: 2 }}>
                  {detailCollect.views}
                </ModalText>
              </Vertical>
              <Vertical style={{ width: constants.width / 2 }}>
                <ModalText>Tags</ModalText>
                <Horizontal>
                  {detailCollect.tags.map((tag, index) => {
                    if (index === detailCollect.tags.length - 1) {
                      return (
                        <ModalText
                          key={index}
                          style={{ fontSize: 20, marginTop: 2 }}
                        >{`${tag}`}</ModalText>
                      );
                    } else {
                      return (
                        <ModalText
                          key={index}
                          style={{ fontSize: 20, marginTop: 2 }}
                        >{`${tag},`}</ModalText>
                      );
                    }
                  })}
                </Horizontal>
              </Vertical>
            </Horizontal>
            <Horizontal>
              <Vertical>
                <ModalText>Like Count</ModalText>
                <ModalText style={{ fontSize: 20, marginTop: 2 }}>
                  {detailCollect.like_count}
                </ModalText>
              </Vertical>
            </Horizontal>
          </View>
        </ModalBackground>
      </Modal>
    </Container>
  );
};

export default DetailPhotoPresenter;

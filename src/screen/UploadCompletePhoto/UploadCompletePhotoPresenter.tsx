import React from "react";
import styled from "styled-components/native";
import { ISelect } from "../UploadPhoto/UploadPhotoContainer";
import { View, Text, TouchableOpacity } from "react-native";
import ExTextInput from "../../components/TextInput";
import constants from "../../../styles/constants";
import Theme from "../../../styles/Theme";
import Button from "../../components/Button";

const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 20};
  height: 50px;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  selectedPhoto: ISelect;
  tags: string;
  loading: boolean;
  onSubmitPhoto: () => Promise<void>;
  onChangeTags: (text: any) => void;
}
const UploadCompletePhotoPresenter: React.SFC<IProps> = ({
  selectedPhoto,
  onSubmitPhoto,
  tags,
  loading,
  onChangeTags
}) => {
  return (
    <View style={{ flex: 1, marginTop: 30, padding: 10 }}>
      <Horizontal>
        <Text
          style={{
            color: Theme.blackFontColor,
            fontWeight: "600",
            fontSize: 18
          }}
        >
          Tags
        </Text>
      </Horizontal>
      <Horizontal>
        <ExTextInput
          width={constants.width - 20}
          placeholder={"Tags (EX:wonsplash,animal)"}
          value={tags}
          onChangeText={onChangeTags}
        />
      </Horizontal>
      <Horizontal style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={onSubmitPhoto}>
          <Button
            text={"Upload"}
            textSize={"12px"}
            textColor={Theme.whiteFontColor}
            textBold={true}
            bgColor={Theme.blackFontColor}
            width={"80px"}
            loading={loading}
            padding={10}
          />
        </TouchableOpacity>
      </Horizontal>
    </View>
  );
};
export default UploadCompletePhotoPresenter;

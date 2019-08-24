import React from "react";
import UploadCompletePhotoPresenter from "./UploadCompletePhotoPresenter";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import { Alert } from "react-native";
import axios from "axios";
import { API_KEY } from "../../../utils";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  uploadPhoto: (photoUri: string, tags: any) => Promise<boolean>;
  feed: () => void;
}
interface IState {
  tags: string;
  loading: boolean;
}
class UploadCompletePhotoContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      tags: "",
      loading: false
    };
  }
  public onSubmitPhoto = async () => {
    const { tags } = this.state;
    const { navigation, uploadPhoto, feed } = this.props;
    const selectedPhoto = navigation.getParam("selected");
    if (tags === "" || selectedPhoto === null) {
      Alert.alert("no selected Photo OR no tags 😰");
      return;
    } else {
      this.setState({ loading: true });
      const convertArray = await tags.split(",");
      const toJsonTags = await JSON.stringify(convertArray);
      const formData = new FormData();
      formData.append("file", {
        uri: selectedPhoto.uri,
        type: selectedPhoto.type,
        name: selectedPhoto.uri
      } as any);
      formData.append("timestamp", ((Date.now() / 1000) | 0).toString());
      formData.append("api_key", API_KEY);
      formData.append("upload_preset", "bojlyeke");
      try {
        const {
          data: { secure_url }
        } = await axios.post(
          "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data"
            }
          }
        );
        if (secure_url) {
          const response = await uploadPhoto(secure_url, toJsonTags);
          if (response) {
            await this.setState({ loading: false });
            await feed();
            navigation.navigate("Feed");
          } else {
            Alert.alert("Something Error 😰");
            this.setState({ loading: false });
          }
        }
      } catch (e) {
        console.log(e);
        this.setState({ loading: false });
      }
    }
  };
  public onChangeTags = text => {
    this.setState({ tags: text });
  };
  public render() {
    const { navigation } = this.props;
    const selectedPhoto = navigation.getParam("selected");
    const { tags, loading } = this.state;
    return (
      <UploadCompletePhotoPresenter
        selectedPhoto={selectedPhoto}
        onSubmitPhoto={this.onSubmitPhoto}
        onChangeTags={this.onChangeTags}
        tags={tags}
        loading={loading}
      />
    );
  }
}

export default UploadCompletePhotoContainer;

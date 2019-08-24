import React from "react";
import UploadPhotoPresenter from "./UploadPhotoPresenter";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Loader from "../../components/Loader";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

export interface ISelect {
  cancelled: boolean;
  height?: number;
  type?: string;
  uri?: string;
  width?: number;
}

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface IState {
  select: ISelect | null;
  loading: boolean;
}
class UploadPhotoContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      select: null,
      loading: true
    };
  }
  public prePermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        this.setState({ loading: false });
      } else {
        Alert.alert("you need Permission to upload Photo ❗");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  public pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    });
    if (!result.cancelled) {
      this.setState({ select: result });
    }
  };
  public componentDidMount() {
    this.prePermission();
  }
  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { select } = this.state;
      const { navigation } = this.props;
      return (
        <UploadPhotoPresenter
          pickImage={this.pickImage}
          select={select}
          navigation={navigation}
        />
      );
    }
  }
}

export default UploadPhotoContainer;

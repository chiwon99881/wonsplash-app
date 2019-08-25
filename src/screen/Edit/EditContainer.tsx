import React from "react";
import EditPresenter from "./EditPresenter";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import Loader from "../../components/Loader";
import { IProfile } from "../../../redux/modules/user";
import { ISelect } from "../UploadPhoto/UploadPhotoContainer";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { API_KEY } from "../../../utils";
import axios from "axios";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  username: string;
  myProfile: IProfile;
  getMyProfile: () => void;
  editProfile: (
    avatar?: string | undefined,
    firstName?: string | undefined,
    lastName?: string | undefined
  ) => Promise<boolean>;
}
interface IState {
  loading: boolean;
  editLoading: boolean;
  selected: ISelect | null;
  firstName: string;
  lastName: string;
}
class EditContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editLoading: false,
      selected: null,
      firstName: "",
      lastName: ""
    };
  }
  public prePermission = async () => {
    const { getMyProfile } = this.props;
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert("we need permissions to this work!");
        return;
      } else {
        getMyProfile();
      }
    } catch (e) {
      console.log(e);
    }
  };
  public componentDidMount() {
    this.prePermission();
  }
  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.myProfile) {
      this.setState({
        loading: false,
        firstName: nextProps.myProfile.first_name,
        lastName: nextProps.myProfile.last_name
      });
    }
  };
  public onChangeFirstName = text => {
    this.setState({ firstName: text });
  };
  public onChangeLastname = text => {
    this.setState({ lastName: text });
  };
  public pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    });
    if (!result.cancelled) {
      this.setState({ selected: result });
    }
  };
  public onSubmitEdit = async () => {
    const { selected, firstName, lastName } = this.state;
    const { editProfile, navigation, getMyProfile } = this.props;
    if (selected !== null || firstName !== "" || lastName !== "") {
      this.setState({ editLoading: true });
      try {
        if (selected === null) {
          const response = await editProfile(undefined, firstName, lastName);
          if (response) {
            await this.setState({ editLoading: false });
            await getMyProfile();
            navigation.navigate("Feed");
          } else {
            Alert.alert("Something wrong 😰");
            this.setState({ editLoading: false });
          }
        } else {
          const formData = new FormData();
          formData.append("file", {
            uri: selected.uri,
            type: selected.type,
            name: selected.uri
          } as any),
            formData.append("timestamp", ((Date.now() / 1000) | 0).toString());
          formData.append("api_key", API_KEY);
          formData.append("upload_preset", "bojlyeke");
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
            const response = await editProfile(secure_url, firstName, lastName);
            if (response) {
              await this.setState({ editLoading: false });
              await getMyProfile();
              navigation.navigate("Feed");
            } else {
              Alert.alert("Something wrong 😰");
              this.setState({ editLoading: false });
            }
          } else {
            throw Error("axios error");
          }
        }
      } catch (e) {
        console.log(e);
        this.setState({ editLoading: false });
      }
    } else {
      Alert.alert("at least 1 field is Required! 🙄");
      return;
    }
  };
  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { navigation, username, myProfile } = this.props;
      const { selected, firstName, lastName, editLoading } = this.state;
      return (
        <EditPresenter
          navigation={navigation}
          username={username}
          myProfile={myProfile}
          selected={selected}
          firstName={firstName}
          lastName={lastName}
          onChangeFirstName={this.onChangeFirstName}
          onChangeLastname={this.onChangeLastname}
          pickImage={this.pickImage}
          editLoading={editLoading}
          onSubmitEdit={this.onSubmitEdit}
        />
      );
    }
  }
}

export default EditContainer;

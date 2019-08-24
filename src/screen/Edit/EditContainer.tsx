import React from "react";
import EditPresenter from "./EditPresenter";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState } from "react-navigation";
import Loader from "../../components/Loader";
import { IProfile } from "../../../redux/modules/user";
import { ISelect } from "../UploadPhoto/UploadPhotoContainer";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  username: string;
  myProfile: IProfile;
  getMyProfile: () => void;
}
interface IState {
  loading: boolean;
  selected: ISelect | null;
  firstName: string;
  lastName: string;
}
class EditContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected: null,
      firstName: "",
      lastName: ""
    };
  }
  public componentDidMount() {
    const { getMyProfile } = this.props;
    getMyProfile();
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
  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { navigation, username, myProfile } = this.props;
      const { selected, firstName, lastName } = this.state;
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
        />
      );
    }
  }
}

export default EditContainer;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ICollect } from "../../../redux/modules/collect";
import Loader from "../../components/Loader";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  feed: () => void;
  collects: ICollect[];
}
interface IState {
  loading: boolean;
}
class FeedContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  public componentDidMount() {
    const { feed } = this.props;
    feed();
  }
  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.collects) {
      this.setState({ loading: false });
    }
  };

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text>Feed</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default FeedContainer;

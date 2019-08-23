import React from "react";
import { Text } from "react-native";
import SearchResultPresenter from "./SearchResultPresenter";
import { NavigationScreenProp } from "react-navigation";
import { NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import { ICollect } from "../../../redux/modules/collect";
import Loader from "../../components/Loader";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  searchTerm: string;
  search: () => void;
  searchCollects: ICollect[];
}
interface IState {
  loading: boolean;
}
class SearchResultContainer extends React.Component<IProps, IState> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {navigation.getParam("searchTerm", "")}
      </Text>
    )
  });

  public componentDidMount() {
    const { search } = this.props;
    search();
  }
  public constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    const { navigation, searchTerm } = this.props;
    navigation.setParams({ searchTerm });
  }
  public UNSAFE_componentWillReceiveProps = (nextProps, prevState) => {
    if (nextProps && nextProps.searchCollects) {
      this.setState({
        loading: false
      });
    }
  };

  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { searchCollects, navigation } = this.props;
      return (
        <SearchResultPresenter
          navigation={navigation}
          searchCollects={searchCollects}
        />
      );
    }
  }
}

export default SearchResultContainer;

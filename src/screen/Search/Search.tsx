import React from "react";
import styled from "styled-components/native";
import { Text, TextInput } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { NavigationState } from "react-navigation";
import { NavigationParams } from "react-navigation";
import Theme from "../../../styles/Theme";
import constants from "../../../styles/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;
const Horizontal = styled.View`
  display: flex;
  width: ${constants.width - 40};
`;
const Label = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
`;
const TextHorizontal = styled.View`
  display: flex;
  justify-content: center;
  width: ${constants.width - 40};
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
  padding: 15px;
`;
const ExampleText = styled.Text`
  font-size: 18px;
  color: ${Theme.blackFontColor};
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface IState {
  searchTerm: string;
}
class Search extends React.Component<IProps, IState> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: 60,
      backgroundColor: "#FBFBFB"
    },
    headerTitle: () => (
      <TextInput
        style={{
          width: constants.width / 1.3,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: Theme.lightGreyColor,
          borderRadius: 10,
          marginRight: 65
        }}
        placeholder={"🔍 Search photos"}
        placeholderTextColor={Theme.greyFontColor}
        returnKeyType={"search"}
        value={navigation.getParam("searchTerm", "")}
        onChangeText={navigation.getParam("onChangeText", () =>
          console.log("Error onChangeText")
        )}
        onSubmitEditing={navigation.getParam("onSubmitEditing", () =>
          console.log("Error onSubmitEditing")
        )}
      />
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Feed")}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 13 }}>
          Cancel
        </Text>
      </TouchableOpacity>
    )
  });

  public constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      searchTerm: ""
    };
    navigation.setParams({ searchTerm: this.state.searchTerm });
    navigation.setParams({ onChangeText: this.onSearchTermChange });
    navigation.setParams({ onSubmitEditing: this.onSubmitEditing });
  }
  public onSearchTermChange = text => {
    this.setState({ searchTerm: text });
  };
  public onSubmitEditing = () => {
    const { searchTerm } = this.state;
    const { navigation } = this.props;
    navigation.navigate("SearchResult", { searchTerm });
  };

  public render() {
    return (
      <Container>
        <Horizontal>
          <Label>Trending</Label>
        </Horizontal>
        <TouchableOpacity>
          <TextHorizontal style={{ marginTop: 10 }}>
            <ExampleText>model</ExampleText>
          </TextHorizontal>
        </TouchableOpacity>
        <TouchableOpacity>
          <TextHorizontal>
            <ExampleText>animal</ExampleText>
          </TextHorizontal>
        </TouchableOpacity>
        <TouchableOpacity>
          <TextHorizontal>
            <ExampleText>튜브</ExampleText>
          </TextHorizontal>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Search;

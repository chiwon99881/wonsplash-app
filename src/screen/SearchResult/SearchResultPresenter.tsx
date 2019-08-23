import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import { ICollect } from "../../../redux/modules/collect";
import Collect from "../../components/Collect";
import { View, Text } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  searchCollects: ICollect[];
}
const SearchResultPresenter: React.SFC<IProps> = ({
  navigation,
  searchCollects
}) => {
  return (
    <>
      {searchCollects.length > 0 ? (
        <ScrollView>
          {searchCollects.map(c => (
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
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600" }}>No Results 😭</Text>
        </View>
      )}
    </>
  );
};

export default SearchResultPresenter;

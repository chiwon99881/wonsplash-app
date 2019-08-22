import React from "react";
import CollectPresenter from "./CollectPresenter";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  withNavigation,
  NavigationInjectedProps
} from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  id: number;
  file: string;
  creator: { id: number; username: string; avatar: string };
  createdAt: string;
  tags: any;
  views: number;
  isLiked: boolean;
  likeCount: number;
}
class CollectContainer extends React.Component<
  IProps & Partial<NavigationInjectedProps>,
  {}
> {
  public render() {
    const {
      navigation,
      id,
      file,
      creator,
      createdAt,
      tags,
      views,
      isLiked,
      likeCount
    } = this.props;
    return (
      <CollectPresenter
        navigation={navigation}
        id={id}
        file={file}
        creator={creator}
        createdAt={createdAt}
        tags={tags}
        views={views}
        isLiked={isLiked}
        likeCount={likeCount}
      />
    );
  }
}

export default withNavigation(CollectContainer);

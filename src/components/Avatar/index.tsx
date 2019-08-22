import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

const ExImage = styled<any>(Image)`
  border-radius: ${props => props.rad};
  width: ${props => props.wid};
  height: ${props => props.hei};
`;

interface IProps {
  uri: string | null;
  wid: string | number;
  hei: string | number;
  rad: string | number;
}
const Avatar: React.SFC<IProps> = ({ uri, wid, hei, rad }) => {
  if (uri === "" || uri === null) {
    return (
      <ExImage
        source={require("../../../assets/noPhoto.jpg")}
        wid={wid}
        hei={hei}
        rad={rad}
        style={{ resizeMode: "center" }}
      />
    );
  } else {
    return (
      <ExImage
        source={{ uri }}
        wid={wid}
        hei={hei}
        rad={rad}
        style={{ resizeMode: "center" }}
      />
    );
  }
};

export default Avatar;

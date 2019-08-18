import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled<any>(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${props => props.bgColor};
  width: ${props => props.width};
  padding: ${props => props.padding}px;
`;
const ExText = styled<any>(Text)`
  font-size: ${props => props.textSize};
  color: ${props => props.textColor};
  font-weight: ${props => (props.textBold ? 600 : 400)};
`;

interface IProps {
  text: string;
  textColor: string;
  textSize: string;
  textBold: boolean;
  bgColor: string;
  width: string | number;
  loading: boolean;
  padding: number;
}
const Button: React.SFC<IProps> = ({
  text,
  loading = false,
  textColor,
  textSize,
  textBold,
  bgColor,
  width,
  padding
}) => {
  return (
    <Container bgColor={bgColor} width={width} padding={padding}>
      {loading ? (
        <ActivityIndicator size={"small"} color={"black"} />
      ) : (
        <ExText textColor={textColor} textSize={textSize} textBold={textBold}>
          {text}
        </ExText>
      )}
    </Container>
  );
};

export default Button;

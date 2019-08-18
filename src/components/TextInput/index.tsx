import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import Theme from "../../../styles/Theme";

const Container = styled<any>(TextInput)`
  width: ${props => props.width};
  background-color: ${Theme.whiteFontColor};
  padding: 10px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;

interface IProps {
  width: string | number;
  placeholder: string;
  placeholderTextColor?: string;
  onChangeText: any;
  onSubmitEditing?: any;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  className?: any;
}
const ExTextInput: React.SFC<IProps> = ({
  width,
  placeholder,
  onChangeText,
  placeholderTextColor,
  returnKeyType,
  onSubmitEditing,
  className
}) => {
  return (
    <Container
      className={className}
      returnKeyType={returnKeyType}
      width={width}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default ExTextInput;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${props => props.theme.greyColor};
  border: 0.5px solid ${props => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  keyboardType = "default",
  autoCapitalize = "none",
  placeholder,
  onChange,
  value,
  returnKeyType = "done",
  onEndEditing = () => null,
  autoCorrect = "true"
}) => (
  <Container>
    <TextInput
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      returnKeyType={returnKeyType}
      onEndEditing={onEndEditing}
      autoCorrect={autoCorrect}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onEndEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default AuthInput;

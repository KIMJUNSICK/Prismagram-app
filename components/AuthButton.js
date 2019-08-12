import React from "react";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.7};
  margin-bottom: 25px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ onPress, text, loading = false }) => (
  <Touchable onPress={onPress} disabled={loading}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default AuthButton;

import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const Touchable = styled.TouchableOpacity``;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton
      onPress={() => navigation.navigate("SignUp")}
      text={"Create New Account"}
    />
    <Touchable onPress={() => navigation.navigate("LogIn")}>
      <LoginLink>
        <LoginLinkText>Log In</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);

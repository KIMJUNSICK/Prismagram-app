import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBcontainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const userNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userNameInput.value,
      email: emailInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value
    }
  });
  const handleSignUp = async () => {
    const { value: userName } = userNameInput;
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      userName === "" ||
      email === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      return Alert.alert("Empty...");
    }
    if (!emailRegex.test(email)) {
      return Alert.alert("Please write valid Email");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Create Account!", "Log In now!");
        navigation.navigate("LogIn", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("User Name taken.", "Log in instead!");
      navigation.navigate("LogIn", { email });
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "357377391624981",
        {
          permissions: ["public_profile"]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert("Fail Connect");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...firstNameInput}
          placeholder="First Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...userNameInput}
          placeholder="User Name"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          returnKeyType="send"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignUp} text={"Sign Up"} />
        <FBcontainer>
          <AuthButton
            loading={false}
            onPress={fbLogin}
            text={"Facebook"}
            blueColor={"#2D4DA7"}
          />
        </FBcontainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

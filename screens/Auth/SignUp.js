import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
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

const GoogleContainer = styled.View`
  margin-top: -5px;
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

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    const [userName] = email.split("@");
    userNameInput.setValue(userName);
  };

  const fbLogin = async () => {
    setLoading(true);
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "357377391624981",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,email,last_name,first_name`
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
      } else {
        Alert.alert("Fail Connect");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };
  const GoogleLogin = async () => {
    const GOOGLE_ANDRIOD =
      "820501501341-vaem86ssabm2ktaqltq9ukrsjljichko.apps.googleusercontent.com";
    const GOOGLE_iOS =
      "820501501341-htr40ouo7dhgd3sq651ciuc4uautvc1e.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDRIOD,
        iosClientId: GOOGLE_iOS,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
        <GoogleContainer>
          <AuthButton
            loading={false}
            onPress={GoogleLogin}
            text={"Google+"}
            blueColor={"#df4a32"}
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

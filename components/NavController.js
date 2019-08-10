import React from "react";
import { View } from "react-native";
import {} from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import MainNavigation from "../navigations/MainNavigation";

export default () => {
  const isLoggedIn = true;
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

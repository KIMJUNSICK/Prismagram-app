import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import MainNavigation from "../navigations/MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

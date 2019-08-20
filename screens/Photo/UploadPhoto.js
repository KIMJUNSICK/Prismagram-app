import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const photo = navigation.getParam("photo").uri;
  return (
    <View>
      <Text>{photo}</Text>
    </View>
  );
};

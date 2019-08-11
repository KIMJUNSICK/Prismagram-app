import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";

const Text = styled.Text``;

const Container = styled.TouchableOpacity``;

const MessagesLink = ({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <Text>Messages</Text>
  </Container>
);

export default withNavigation(MessagesLink);

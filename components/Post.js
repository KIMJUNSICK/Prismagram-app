import React from "react";
import { Image, Platform } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const IconContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Touchable = styled.TouchableOpacity``;

const Post = ({ location, user, files = [] }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.userName}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        style={{ height: constants.height / 2.5 }}
        paginationStyle={{ position: "absolute", bottom: -25 }}
        dotStyle={{ width: 4, height: 4 }}
        activeDotStyle={{ width: 4, height: 4 }}
      >
        {files.map(file => (
          <Image
            source={{ uri: file.url }}
            style={{ width: constants.width, height: constants.height / 2.5 }}
            key={file.id}
          />
        ))}
      </Swiper>
      <IconsContainer>
        <Touchable>
          <IconContainer>
            <Ionicons
              size={28}
              name={
                Platform.OS === "ios" ? "ios-heart-emtpy " : "md-heart-empty"
              }
            />
          </IconContainer>
        </Touchable>
        <Touchable>
          <IconContainer>
            <Ionicons
              size={28}
              name={
                Platform.OS === "ios" ? "ios-heart-emtpy " : "md-heart-empty"
              }
            />
          </IconContainer>
        </Touchable>
        <IconContainer />
      </IconsContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default Post;

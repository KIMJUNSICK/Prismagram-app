import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View``;

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

const Bold = styled.Text`
  font-weight: 500;
`;

const Touchable = styled.TouchableOpacity``;

const Post = ({ location, user }) => {
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

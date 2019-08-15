import React, { useState } from "react";
import { Image, Platform } from "react-native";
import Swiper from "react-native-swiper";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";

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

const Caption = styled.Text`
  margin: 5px 0px;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin: 5px 0px;
`;

const IconContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Touchable = styled.TouchableOpacity``;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Post = ({
  id,
  user,
  location,
  caption,
  files = [],
  comments = [],
  likeCount: likeCountProp,
  isLiked: isLikedProp,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaion] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount(number => number - 1);
    } else {
      setLikeCount(number => number + 1);
    }
    setIsLiked(p => !p);
    try {
      toggleLikeMutaion();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { userName: user.userName })
          }
        >
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { userName: user.userName })
          }
        >
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
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                color={isLiked ? styles.redColor : styles.blackColor}
                size={28}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-emtpy "
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                color={styles.blackColor}
                size={24}
                name={Platform.OS === "ios" ? "ios-text " : "md-text"}
              />
            </IconContainer>
          </Touchable>
          <IconContainer />
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Touchable>
          <Caption>
            <Bold>{user.userName}</Bold> {caption}
          </Caption>
        </Touchable>
        <Touchable>
          <CommentCount>See All {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
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

export default withNavigation(Post);

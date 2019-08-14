import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({
  files = [],
  navigation,
  id,
  likeCount,
  commentConunt
}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("Detail", { id, commentConunt, likeCount, files })
    }
  >
    <Image
      source={{ uri: files[0].url }}
      style={{ width: constants.width / 3, height: constants.height / 6 }}
    />
  </TouchableOpacity>
);

SquarePhoto.propTypes = {
  id: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TouchableOpacity, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 80;
  height: 80;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`;

const IconContainer = styled.View``;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [canTake, setCanTake] = useState(true);
  const takePhoto = async () => {
    if (!canTake) {
      return;
    }
    try {
      setCanTake(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset);
    } catch (error) {
      console.log(error);
      setCanTake(true);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              width: constants.width,
              height: constants.height / 2,
              padding: 15,
              justifyContent: "flex-start",
              alignItems: "flex-end"
            }}
          >
            <TouchableOpacity onPress={toggleType}>
              <IconContainer>
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-reverse-camera"
                      : "md-reverse-camera"
                  }
                  size={32}
                  color={"white"}
                />
              </IconContainer>
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTake}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

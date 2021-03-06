import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import axios from "axios";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";
import ngrok from "../../apollo";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const photo = navigation.getParam("photo");
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");

  const handleUpload = async () => {
    if (captionInput === "" || locationInput === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri
    });
    try {
      const {
        data: { location }
      } = await axios.post(
        `${ngrok}/api/upload`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        },
        setFileUrl(location)
      );
    } catch (e) {
      Alert.alert("Cant upload", "Try later");
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            value={captionInput.value}
            onChangeText={captionInput.onChange}
            placeholder="Caption"
            placeholderTextColor={styles.darkGreyColor}
            multiline={true}
          />
          <STextInput
            value={locationInput.value}
            onChangeText={locationInput.onChange}
            placeholder="Location"
            placeholderTextColor={styles.darkGreyColor}
            multiline={true}
          />
          <Button onPress={handleUpload}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};

import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../fragments";
import Loader from "../../components/Loader";
import UserProfie from "../../components/UserProfile";

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfie {...data.me} />}
    </ScrollView>
  );
};

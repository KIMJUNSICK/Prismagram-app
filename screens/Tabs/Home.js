import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragments";

const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default () => {
  const [refresing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

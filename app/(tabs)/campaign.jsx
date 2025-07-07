import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCampaigncard from "../../components/CustomCampaigncard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { fetchAllCampaign, fetchAllLikeFromUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const campaign = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataArrayCampaign, setDataArrayCampaign] = useState();
  const [liked, setLiked] = useState({});
  const { user } = useGlobalContext();
  const userId = user.$id;
  useEffect(() => {
    fetchLike();
    fetchData();
  }, []);

  const fetchLike = async () => {
    const res = await fetchAllLikeFromUser(userId);
    const liked = {};
    res.forEach((doc) => (liked[doc.campaign.$id] = true));
    setLiked(liked);
  };

  const fetchData = async () => {
    const res = await fetchAllCampaign();
    setDataArrayCampaign(res);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchLike();
    fetchData();
    console.log(liked);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={dataArrayCampaign}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <CustomCampaigncard
            id={item.$id}
            title={item.judul}
            tanggal={item.$createdAt}
            thumbnail={item.thumbnail}
            like={item.like}
            userId={userId}
            liked={liked}
            setLiked={setLiked}
          />
        )}
        ListHeaderComponent={() => (
          <View className="items-center mb-5">
            <Text className="mt-5 font-bold text-lg text-center text-secondary">
              Campaign!!!!
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="belum ada campaign yang bisa di kerjakan"
            subtitle="silahkan menunggu admin untuk campaign berikutnya"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default campaign;

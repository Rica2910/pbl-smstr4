import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomCampaigncard from "../../components/CustomCampaigncard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import {
  db,
  ID,
  config,
  fetchAllCampaign,
  fetchAllLikeFromUser,
} from "../../lib/appwrite";
import CustomAddCampaign from "../../components/CustomAddCampaign";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";

const CampaignAdmin = () => {
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
  const handlePress = () => {
    router.push("/addCampaign");
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={dataArrayCampaign}
        keyExtractor={(item) => item.$id}
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
          <CustomAddCampaign
            title={"Tambah Campaign"}
            handlePress={handlePress}
          />
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

export default CampaignAdmin;

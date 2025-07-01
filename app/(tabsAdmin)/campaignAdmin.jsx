import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomCampaigncard from "../../components/CustomCampaigncard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { db, ID, config, fetchAllCampaign } from "../../lib/appwrite";
import CustomAddCampaign from "../../components/CustomAddCampaign";

const CampaignAdmin = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataArrayCampaign, setDataArrayCampaign] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetchAllCampaign();
    setDataArrayCampaign(res);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
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
          />
        )}
        ListHeaderComponent={() => (
          <CustomAddCampaign title={"Tambah Campaign"} />
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

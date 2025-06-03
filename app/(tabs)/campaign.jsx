import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomCampaigncard from "../../components/CustomCampaigncard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { db, ID, config } from "../../lib/appwrite";

const campaign = () => {
      const [refreshing, setRefreshing] = useState(false);
    const dummyData = [
  { id: "1", title: "Kegiatan bersih-bersih lingkungan" },
  { id: "2", title: "kegiatan donasi di panti asuhan" },
  { id: "3", title: "kegiatan pengolahan sampah" },
];

     const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };


    return (
        <SafeAreaView className="bg-primary h-full ">
              <FlatList
                data={dummyData}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => (
                  <CustomCampaigncard
                    id={item.id}
                    title={item.title}
                  />
                )}
                ListEmptyComponent={() => (
                  <CustomEmptyState
                    title="belum ada campaign yang bisa di kerjakan"
                    subtitle="silahkan menunggu admin untuk campaign berikutnya"
                  />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              />
              <StatusBar style="dark" backgroundColor="#fff" />
            </SafeAreaView>
    )

}


export  default campaign;
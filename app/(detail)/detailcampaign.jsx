import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAddCampaign from "../../components/CustomAddCampaign";
import CustomFotoCampaign from "../../components/CustomFotoCampaign";
import CustomEmptyState from "../../components/CustomEmptyState";
import { fetchFotoCampaign } from "../../lib/appwrite";

const DetailCampaign = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const { title, id, userId, tanggal } = useLocalSearchParams();

  const fetchFoto = async () => {
    const res = await fetchFotoCampaign(id);
    setData(res);
  };

  useEffect(() => {
    fetchFoto();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFoto();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="items-center">
            <CustomFotoCampaign photo={item.photo} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View className="items-center justify-center w-[80%] mt-10 bg-secondary">
              <View>
                <Text className="text-base mt-1"> {title}</Text>
                <Text className="text-base mt-1"> Tanggal {tanggal}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="belum ada foto"
            subtitle="silahkan menunggu admin untuk menambahkan foto"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default DetailCampaign;

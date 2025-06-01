import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomTongCard from "../../components/CustomTongCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { getSampahTongItems } from "../../lib/action";

const Tong = () => {
  const [tongItems, setTongItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTongItems = async () => {
    const items = await getSampahTongItems();
    setTongItems(items);
  };

  useEffect(() => {
    fetchTongItems();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTongItems();
    setRefreshing(false);
  };

  const handleDeleteAll = () => {
  
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={tongItems}
        keyExtractor={(item) => item.$id}
        numColumns={1}
        renderItem={({ item }) => (
          <CustomTongCard data={item} containerStyles="mt-5 px-4" />
        )}
        ListHeaderComponent={() => (
          <>
            <CustomButton
              title="Tong Sampah"
              handlePress={() =>
                router.push({
                  pathname: "/penyetoran",
                  params: { items: JSON.stringify(tongItems) },
                })
              }
              containerStyles=" mt-7 py-[20px] w-[95%] self-center rounded-none"
            />
            <TouchableOpacity onPress={handleDeleteAll} className=" mt-3">
              <Text className="text-red-500 px-4 text-lg">Hapus Semua</Text>
            </TouchableOpacity>
          </>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="tong sedang kosong"
            subtitle="Tambahkan sampah agar tong terisi"
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

export default Tong;

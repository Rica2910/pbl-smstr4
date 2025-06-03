import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomTongCard from "../../components/CustomTongCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { getSampahTongItems, deleteSampahTongItem } from "../../lib/action";

const Tong = () => {
  const [tongItems, setTongItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteAll = () => {
    if (tongItems.length === 0) return;

    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin untuk menghapus semua?",
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Ya",
          style: "destructive",
          onPress: async () => {
            try {
              for (const item of tongItems) {
                await deleteSampahTongItem(item.$id);
              }
              setTongItems([]);
              setSelectedItems([]);
              console.log("Semua item berhasil dihapus");
            } catch (error) {
              console.error("Gagal menghapus semua item:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    Alert.alert(
      "Konfirmasi",
      `Hapus ${selectedItems.length} item terpilih?`,
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Ya",
          style: "destructive",
          onPress: async () => {
            try {
              for (const id of selectedItems) {
                await deleteSampahTongItem(id);
              }
              const updatedItems = tongItems.filter(
                (item) => !selectedItems.includes(item.$id)
              );
              setTongItems(updatedItems);
              setSelectedItems([]);
            } catch (error) {
              console.error("Gagal hapus item terpilih:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={tongItems}
        keyExtractor={(item) => item.$id}
        numColumns={1}
        renderItem={({ item }) => (
          <CustomTongCard
            data={item}
            containerStyles="mt-5 px-4"
            isSelected={selectedItems.includes(item.$id)}
            toggleSelect={() => toggleSelectItem(item.$id)}
          />
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

            <View className="mt-3 px-4 flex-row justify-between items-center">
              <TouchableOpacity onPress={handleDeleteAll}>
                <Text className="text-red-500 text-lg">Hapus Semua</Text>
              </TouchableOpacity>

              {selectedItems.length > 0 && (
                <TouchableOpacity onPress={handleDeleteSelected}>
                  <Text className="text-red-500 text-lg">
                    Hapus ({selectedItems.length})
                  </Text>
                </TouchableOpacity>
              )}
            </View>
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

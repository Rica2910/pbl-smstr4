import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomItemCard from "../../components/CustomItemCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { db, ID, config } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";


const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";


const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const Home = () => {
  const [search, setSearch] = useState({ search: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();

  const dummyData = ["Semua", "Elektronik", "Kaca", "Kertas", "Logam", "Minyak", "Plastik"];

  const dummyData2 = [
    {
      id: "1",
      title: "Tv",
      type: "Elektronik",
      poin: 6500,
      unitType: "Unit",
      image: { uri: getImageUrl("683b22be0004d3e5c06d") }, 
      imagesampah: "683b22be0004d3e5c06d"
    },
    {
      id: "2",
      title: "Kulkas",
      type: "Elektronik",
      poin: 12000,
      unitType: "Unit",
      image: { uri: getImageUrl("683b1fab000d2ac6e0ea") },
        imagesampah: "683b1fab000d2ac6e0ea",
    },
    {
      id: "3",
      title: "Monitor",
      type: "Elektronik",
      poin: 7000,
      unitType: "Unit",
      image: { uri: getImageUrl("683c32c0002b7ccc11c9") },
      imagesampah: "683c32c0002b7ccc11c9"
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleAddToTong = async (item) => {
    try {
      setLoading(true);
      const userId = "current-user-id";

      await db.createDocument(
        config.databaseId,
        config.tongCollectionId,
        ID.unique(),
        {
          status: "waiting",
          title: item.title,
          type: item.type,
          unitType: item.unitType,
          poin: item.poin,
          imagesampah: item.imagesampah,
        }
      );

      Alert.alert("Berhasil", `${item.title} berhasil ditambahkan ke tong.`);
    } catch (error) {
      console.error("Error adding to tong:", error);
      Alert.alert("Gagal", "Gagal menambahkan item ke tong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData2}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CustomItemCard
            source={item.image}
            title={item.title}
            poin={item.poin}
            type={item.type}
            unitType={item.unitType}
            containerStyles="mt-5"
            onAdd={() => handleAddToTong(item)}
            loading={loading}
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="mt-5 h-20 justify-center">
              <View className="flex-row">
                <Text className="text-3xl font-pmedium">Selamat datang, </Text>
                <Text className="text-3xl font-pmedium text-secondary">
                  {user ? user.nama : "Pengguna"}
                </Text>
              </View>
            </View>
            <CustomSearchField
              title="Search"
              placeholder="Cari sampah yang ingin ditambahkan"
              value={search.search}
              handleChangeText={(e) => setSearch({ ...search, search: e })}
            />
            <CustomTypeButton data={dummyData} containerStyles="mt-2" />
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="Jenis sampah yang anda cari tidak ada"
            subtitle="Silahkan hubungi admin agar jenis sampah tersebut ditambahkan"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Home;

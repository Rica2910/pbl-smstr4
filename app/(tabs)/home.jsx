import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState, useEffect } from "react";
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
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [items, setItems] = useState([]);
  const { user } = useGlobalContext();

  const dummyData = [
    "Semua",
    "Elektronik",
    "Kaca",
    "Kertas",
    "Logam",
    "Minyak",
    "Plastik",
  ];

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await db.listDocuments(
        config.databaseId,
        config.sampahCollectionId
      );

      const fetchedItems = response.documents.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        type: doc.type,
        poin: doc.poin,
        unitType: doc.unitType,
        image: { uri: getImageUrl(doc.imagesampah) },
        imagesampah: doc.imagesampah,
      }));

      setItems(fetchedItems);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      Alert.alert("Error", "Gagal memuat data dari server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
  };

  const handleAddToTong = async (item) => {
    try {
      setLoading(true);

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
          users: user.$id,
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

  const filteredItems =
    filterStatus === "Semua"
      ? items
      : items.filter((item) => item.type === filterStatus);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredItems}
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
            <CustomTypeButton
              data={dummyData}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              containerStyles="mt-2"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="Jenis sampah yang anda cari tidak ada"
            subtitle="Silahkan hubungi admin agar jenis sampah tersebut ditambahkan"
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

export default Home;

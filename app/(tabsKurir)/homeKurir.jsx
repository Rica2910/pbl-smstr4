import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomFormCard from "../../components/CustomFormCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/globalProvider";
import { fetchAllPenyetoran } from "../../lib/appwrite";
import { router } from "expo-router";

const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";

const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const HomeKurir = () => {
  const [search, setSearch] = useState({ search: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [dataArray, setDataArray] = useState([]);
  const [newItemsArray, setNewItemsArray] = useState([]);

  const { user } = useGlobalContext();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchAllPenyetoran();
      setDataArray(response);
    } catch (error) {
      console.error("Gagal fetch data:", error);
      Alert.alert("Error", "Gagal mengambil data dari server.");
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    if (!dataArray) return;

    if (filterStatus === "Semua") {
      setNewItemsArray(dataArray);
    } else {
      const filtered = dataArray.filter((item) =>
        item.status.toLowerCase().includes(filterStatus.toLowerCase())
      );
      setNewItemsArray(filtered);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterStatus, dataArray]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const dummyData = [
    "Semua",
    "Menunggu Penjemputan",
    "Disetujui",
    "Dijemput",
    "Tidak Disetujui",
    "Selesai",
    "Batal",
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={newItemsArray || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomFormCard
            data={item}
            handlePress={() =>
              router.push(`/validasiPenjemputan?id=${item.$id}`)
            }
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="mt-5 h-20 justify-center">
              <View className="flex-row">
                <Text className="text-3xl font-pmedium">Selamat datang, </Text>
                <Text className="text-3xl font-pmedium text-secondary">
                  {user.nama}
                </Text>
              </View>
            </View>
            <CustomSearchField
              title="Search"
              placeholder="Cari sampah yang ingin dijemput"
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
            title="Form sampah yang anda cari tidak ada"
            subtitle="Kosong"
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

export default HomeKurir;

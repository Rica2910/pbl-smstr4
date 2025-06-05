import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomFormCard from "../../components/CustomFormCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/globalProvider";
import { fetchDataPenyetoran } from "../../lib/appwrite";
import { router } from "expo-router";

const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";

const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const HomeAdmin = () => {
  const [search, setSearch] = useState({ search: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Menunggu");
  const [dataArray, setdataArray] = useState();

  const { user } = useGlobalContext();

  const fetchData = async () => {
    const response = await fetchDataPenyetoran();
    setdataArray(response);
  };

  const statusIndex =
    filterStatus === "Menunggu"
      ? { "Menunggu Penjemputan": 1, "Tidak Disetujui": 2, Disetujui: 3 }
      : filterStatus === "Disetujui"
      ? { "Menunggu Penjemputan": 2, "Tidak Disetujui": 3, Disetujui: 1 }
      : { "Menunggu Penjemputan": 2, "Tidak Disetujui": 1, Disetujui: 3 };
  const [newItemsArray, setNewItemsArray] = useState();

  useEffect(() => {
    filterData();
    fetchData();
  }, [filterStatus]);

  const filterData = async () => {
    const filteredData = dataArray.sort(
      (a, b) => statusIndex[a.status] - statusIndex[b.status]
    );
    setNewItemsArray(filteredData);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await filterData();
    setRefreshing(false);
  };

  const dummyData = ["Menunggu", "Disetujui", "Tidak Disetujui"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={newItemsArray}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomFormCard
            data={item}
            handlePress={() => router.push("/validasiPenyetoran")}
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

export default HomeAdmin;

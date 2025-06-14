import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomFormCard from "../../components/CustomFormCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/globalProvider";
import {
  databaseId,
  db,
  fetchDataPenyetoran,
  penyetoranCollectionId,
} from "../../lib/appwrite";
import { router } from "expo-router";

const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";

const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const HomeAdmin = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataArray, setdataArray] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [newItemsArray, setNewItemsArray] = useState([]);

  const { user } = useGlobalContext();

  const dummyData = [
    "Semua",
    "Menunggu Persetujuan",
    "Menunggu Penjemputan",
    "Selesai",
    "Tidak Setuju",
  ];

  const statusMapping = {
    Semua: [
      "Menunggu Persetujuan",
      "Menunggu Penjemputan",
      "Selesai",
      "Tidak Setuju",
    ],
    "Menunggu Persetujuan": ["Menunggu Persetujuan"],
    "Menunggu Penjemputan": ["Menunggu Penjemputan"],
    Selesai: ["Selesai"],
    "Tidak Setuju": ["Tidak Setuju"],
  };

  const fetchData = async () => {
    const response = await fetchDataPenyetoran();
    setdataArray(response);
  };

  const filterData = () => {
    if (!dataArray) return;

    const filtered = dataArray.filter((item) =>
      statusMapping[filterStatus].includes(item.status)
    );

    setNewItemsArray(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterStatus, dataArray]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const queryForm = async (inquery) => {
    try {
      const response = await db.getDocument(
        databaseId,
        penyetoranCollectionId,
        inquery.nativeEvent.text
      );

      if (Array.isArray([response])) {
        console.log("Response adalah array");
        setNewItemsArray([response]);
      } else {
        console.log("Response bukan sebuah array");
        setNewItemsArray([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={newItemsArray}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomFormCard
            data={item}
            handlePress={() =>
              router.push(`/validasiPenyetoran?id=${item.$id}`)
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
              placeholder="Cari sampah yang ingin ditambahkan"
              onEndEditing={(e) => queryForm(e)}
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

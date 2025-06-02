import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomFormCard from "../../components/CustomFormCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/globalProvider";


const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";


const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const HomeAdmin = () => {
  const [search, setSearch] = useState({ search: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useGlobalContext();

  const dummyData2 = [
    {
        created_at: "10/08/25",
        status: "Menunggu",
        nama: "Aiman",
        sampah: "TV",
        type:"Elektronik"
    },
    {
        created_at: "10/08/25",
        status: "Menunggu",
        nama: "Aiman",
        sampah: "kulkas",
        type:"Elektronik"
    },
    {
        creted_at: "10/08/25",
        status: "Menunggu",
        nama: "Aiman",
        sampah: "Monitor",
        type:"Elektronik"
    },
  ]

  const dummyData = ["Semua", "Menunggu", "Disetujui", "Tidak Disetujui"];
  


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData2}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <CustomFormCard data={item} handlePress={() => {console.log("pergi ke penyetoran page")}}/>
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="mt-5 h-20 justify-center">
              <View className="flex-row">
                <Text className="text-3xl font-pmedium">Selamat datang, </Text>
                <Text className="text-3xl font-pmedium text-secondary">{user.nama}</Text>
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
            title="Form sampah yang anda cari tidak ada"
            subtitle="Kosong"
          />
        )}
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default HomeAdmin;

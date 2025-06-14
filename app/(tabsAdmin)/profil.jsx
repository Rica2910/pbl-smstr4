import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import CustomButtonStatus from "../../components/CustomButtonStatus";
import CustomProfilHeader from "../../components/CustomProfilHeader";
import CustomGap from "../../components/CustomGap";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { currentActiveAccount, signOut } from "../../lib/appwrite";
import { db, config } from "../../lib/appwrite";

const Profil = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    diproses: 0,
    dijemput: 0,
    ditimbang: 0,
  });

  const fetchCurrentActiveUser = async () => {
    const user = await currentActiveAccount();
    setActiveUser([user]); // supaya bisa tetap di-FlatList
  };

  const fetchStatusCounts = async () => {
    try {
      const response = await db.listDocuments(
        config.databaseId,
        config.penyetoranCollectionId
      );
      const documents = response.documents;

      const counts = {
        diproses: documents.filter(
          (doc) =>
            doc.status === "Menunggu Penjemputan" || doc.status === "Disetujui"
        ).length,
        dijemput: documents.filter((doc) => doc.status === "dijemput").length,
        ditimbang: documents.filter((doc) => doc.status === "ditimbang").length,
      };

      setStatusCounts(counts);
    } catch (error) {
      console.error("Gagal mengambil data status:", error);
    }
  };

  useEffect(() => {
    fetchCurrentActiveUser();
    fetchStatusCounts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCurrentActiveUser();
    await fetchStatusCounts();
    setRefreshing(false);
  };

  const dummyData = [
    {
      title: "Di proses",
      icon: icons.box,
      count: statusCounts.diproses,
      handlePress: () => router.push("/diproses"),
    },
    {
      title: "Di jemput",
      icon: icons.truckStatus,
      count: statusCounts.dijemput,
      handlePress: () => router.push("/dijemput"),
    },
    {
      title: "Di timbang",
      icon: icons.neraca,
      count: statusCounts.ditimbang,
      handlePress: () => router.push("/ditimbang"),
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={activeUser}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View className="bg-secondary w-full p-4 h-40">
              <CustomProfilHeader data={activeUser} />
            </View>

            <View className="px-4 h-40 justify-center mt-5 border-b border-secondary">
              <Text className="font-pmedium mb-5">Lihat status pesanan</Text>
              <CustomButtonStatus data={dummyData} containerStyles="" />
            </View>

            <CustomGap />
          </View>
        )}
        ListFooterComponent={
          <View>
            <CustomGap />
            <View className="px-4">
              <CustomButton
                title={"keluar"}
                containerStyles={"mt-3 h-[50px]"}
                handlePress={signOut}
                isLoading={isSubmitting}
              />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="dark" backgroundColor="#2dcd6e" />
    </SafeAreaView>
  );
};

export default Profil;

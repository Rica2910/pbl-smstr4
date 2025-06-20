import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import CustomButtonStatus from "../../components/CustomButtonStatus";
import CustomProfilHeader from "../../components/CustomProfilHeader";
import CustomFlatButton from "../../components/CustomFlatButton";
import CustomGap from "../../components/CustomGap";
import CustomTierProgress from "../../components/CustomTierProgress";
import { router } from "expo-router";
import { currentActiveAccount, signOut } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import { db, config } from "../../lib/appwrite";
import CustomRedeemPointsModal from "../../components/CustomRedeemPointsModal";

const Profil = () => {
  const [statusCounts, setStatusCounts] = useState({
    diproses: 0,
    dijemput: 0,
    ditimbang: 0,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);

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

  const fetchCurrentActiveUser = async () => {
    const user = await currentActiveAccount();
    console.log("User object:", user);
    console.log("User properties:", Object.keys(user || {}));
    console.log("User penukaran value:", user?.penukaran);
    setActiveUser([user]);
  };

  useEffect(() => {
    fetchCurrentActiveUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCurrentActiveUser();
    setRefreshing(false);
  };

  const dummyData = [
    {
      id: "1",
      title: "Di proses",
      icon: icons.box,
      count: statusCounts.diproses,
      handlePress: () => router.push("/diproses"),
    },
    {
      id: "2",
      title: "Di jemput",
      icon: icons.truckStatus,
      count: statusCounts.dijemput,
      handlePress: () => router.push("/dijemput"),
    },
    {
      id: "3",
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
        renderItem={({ item }) => (
          <View>
            <CustomTierProgress data={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View className="bg-secondary w-full p-4 h-40 ">
              <CustomProfilHeader data={activeUser} />
            </View>

            <View className="px-4 h-40 justify-center mt-5 border-b border-secondary">
              <Text className="font-pmedium mb-5">Lihat status pesanan</Text>
              <CustomButtonStatus data={dummyData} containerStyles="" />
            </View>
            <View className="p-4 border-b border-secondary">
              <TouchableOpacity
                onPress={() => {
                  console.log("Tukarkan poin button pressed");
                  console.log("Current modal state:", isRedeemModalVisible);
                  Alert.alert("Test", "Button pressed!");
                  setIsRedeemModalVisible(true);
                  console.log("Modal state after setState:", true);
                }}
                className="px-4 flex-row justify-between items-center"
              >
                <View className="flex-row items-center gap-2">
                  <Text className="text-black font-pmedium">Tukarkan poin</Text>
                </View>
                <View className="flex-row items-center">
                  <Text>{">"}</Text>
                </View>
              </TouchableOpacity>
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
                handlePress={() => {
                  console.log("Tombol logout ditekan");
                  signOut();
                }}
                isLoading={isSubmitting}
              />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
      <CustomRedeemPointsModal
        visible={isRedeemModalVisible}
        onClose={() => setIsRedeemModalVisible(false)}
        userPoints={activeUser?.[0]?.penukaran || 0}
      />
      
      <StatusBar style="dark" backgroundColor="#2dcd6e" />
    </SafeAreaView>
  );
};

export default Profil;

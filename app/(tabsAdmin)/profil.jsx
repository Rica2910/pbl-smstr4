import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
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

const Profil = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCurrentActiveUser = async () => {
    const user = await currentActiveAccount();
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
      title: "Di proses",
      icon: icons.box,
      handlePress: () => {
        router.push("/diproses");
        console.log("di proses");
      },
    },
    {
      title: "Di jemput",
      icon: icons.truckStatus,
      handlePress: () => {
        router.push("/dijemput");
        console.log("di jemput");
      },
    },
    {
      title: "Di timbang",
      icon: icons.neraca,
      handlePress: () => {
        router.push("/ditimbang");
        console.log("di timbang");
      },
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={activeUser}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View className="bg-secondary w-full p-4 h-40 ">
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

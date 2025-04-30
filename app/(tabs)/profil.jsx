import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import CustomButtonStatus from "../../components/CustomButtonStatus";
import CustomProfilHeader from "../../components/CustomProfilHeader";
import CustomFlatButton from "../../components/CustomFlatButton";
import CustomGap from "../../components/CustomGap";
import CustomTierProgress from "../../components/CustomTierProgress";
import { router } from "expo-router";
import { currentActiveAccount } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";

const Profil = () => {
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

  // const { data: activeAccount, refetch } = useAppwrite(currentActiveAccount);

  const dummyData3 = [
    {
      nama: "Aiman",
      tier: "Silver",
      poin: "60000",
      penukaran: 500,
      avatar: images.profile,
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData3}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View>
            <CustomTierProgress data={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View className="bg-secondary w-full p-4 h-40 ">
              <CustomProfilHeader data={dummyData3} />
            </View>

            <View className="px-4 h-40 justify-center mt-5 border-b border-secondary">
              <Text className="font-pmedium mb-5">Lihat status pesanan</Text>
              <CustomButtonStatus data={dummyData} containerStyles="" />
            </View>
            <View className="p-4 border-b border-secondary">
              <CustomFlatButton
                title="Tukarkan poin"
                icon={icons.transfer}
                handlePress={() => console.log(currentActiveAccount())}
              />
            </View>
            <CustomGap />
          </View>
        )}
      />
      <StatusBar style="dark" backgroundColor="#2dcd6e" />
    </SafeAreaView>
  );
};

export default Profil;

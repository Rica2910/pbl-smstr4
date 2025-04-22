import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import CustomButtonStatus from "../../components/CustomButtonStatus";

const Profil = () => {
  const dummyData = [
    {
      title: "Di proses",
      icon: icons.box,
      handlePress: () => console.log("di proses"),
    },
    {
      title: "Di timbang",
      icon: icons.neraca,
      handlePress: () => console.log("di timbang"),
    },
    {
      title: "Di jemput",
      icon: icons.truckStatus,
      handlePress: () => console.log("di jemput"),
    },
  ];

  const dummyData2 = ["82l"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData2}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListHeaderComponent={() => (
          <View>
            <View className="bg-secondary w-full p-4 h-40 ">
              <View className="flex-row items-center mt-10">
                <Image
                  source={images.profile}
                  className="w-20 h-20 rounded-full"
                />
                <View className="pl-4">
                  <View className="flex-row items-center">
                    <Text className="font-pmedium text-2xl text-primary">
                      Aiman
                    </Text>
                    <View className="rounded-lg bg-gold justify-center items-center w-20 h-5 ml-2">
                      <Text className="font-pmedium">Gold</Text>
                    </View>
                  </View>
                  <Text className="font-pmedium text-sm text-primary">
                    60000 <Text>Point</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View className="px-4 h-40 justify-center">
              <Text>Lihat status pesanan</Text>
              <CustomButtonStatus
                data={dummyData}
                containerStyles="h-[50px] mt-3"
              />
            </View>
            <StatusBar style="dark" backgroundColor="#2dcd6e" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profil;

import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router"; 

const CustomCampaigncard = ({ title, id }) => {
  const handlePress = () => {
    router.push({
      pathname: "/detailcampaign",
      params: { title, id },
    });
  };

  return (
    <Pressable onPress={handlePress} className="items-center">
      <View className="w-[80%] h-[150px] mt-5">
        <Text className="mb-3">Tanggal 10/06/2025</Text>
        <View className="w-full h-[130px] bg-secondary items-center justify-center rounded-xl">
          <Text className="font-bold">{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomCampaigncard;

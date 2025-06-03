import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const DetailCampaign = () => {
  const { title, id } = useLocalSearchParams(); 

  return (
    <View className="items-center justify-center w-[80%] mt-10 bg-secondary">
        <View>
          <Text className="text-base mt-1"> {title}</Text>
          <Text className="text-base mt-1"> Tanggal 10/6/2025</Text>
        </View>
    </View>
  );
};

export default DetailCampaign;

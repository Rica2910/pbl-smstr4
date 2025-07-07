import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { icons } from "../constants";

const CustomAddCampaign = ({ title, handlePress }) => {
  return (
    <Pressable onPress={handlePress} className="items-center">
      <View className="w-[80%] h-[150px] mt-5">
        <View className="w-full h-[130px] bg-secondary items-center justify-around rounded-xl flex-row">
          <Image
            source={icons.plus}
            className="w-10 h-10"
            resizeMode="contain"
            style={{ tintColor: "#000" }}
          />
          <Text className="font-bold">{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomAddCampaign;

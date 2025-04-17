import { View, Text, Image } from "react-native";
import React from "react";
import "../global.css";
import { icons } from "../constants";

const CustomEmptyState = ({ title, subtitle }) => {
  return (
    <View className="px-4 h-full justify-center items-center">
      <Image source={icons.search} className="w-40 h-40 mb-5" />
      <Text className="text-2xl">{title}</Text>
      <Text className="text-sm">{subtitle}</Text>
    </View>
  );
};

export default CustomEmptyState;

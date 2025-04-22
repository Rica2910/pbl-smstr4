import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { icons } from "../constants";

const CustomFlatButton = ({
  title,
  icon,
  containerStyles,
  textStyles,
  isLoading,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`px-4 flex-row justify-between items-center ${
        isLoading ? "opacity-50" : ""
      } ${containerStyles || ""}`}
      disabled={isLoading}
    >
      <View className="flex-row items-center gap-2">
        <Image
          source={icon}
          className="w-10 h-10"
          resizeMode="contain"
          style={{ tintColor: "#2dcd6e" }}
        />
        <Text className={`text-black font-pmedium ${textStyles}`}>{title}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="font-pmedium text-sm text-black">60000 </Text>
        <Image source={icons.poin} className="w-6 h-6" resizeMode="contain" />
        <Text>{" >"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomFlatButton;

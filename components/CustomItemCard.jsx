import { View, Text, Image } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";

const CustomItemCard = ({
  item,
  source,
  containerStyles,
  title,
  type,
  poin,
  unitType,
  onAdd,
  loading,
}) => {
  return (
    <View className={`w-60 h-80 justify-center items-center ${containerStyles}`}>
      <Image source={source} className="w-40 h-40" resizeMode="cover" />
      <Text className="font-psemibold text-xl">{title}</Text>
      <Text className="text-gray-100">{type}</Text>
      <Text>
        {poin} Poin / {unitType}
      </Text>

      <CustomButton
  title={loading ? "Menambahkan..." : "Tambahkan"}
  handlePress={() => onAdd(item)} // ✅ aman
  containerStyles="mt-5"
  disabled={loading}
/>
    </View>
  );
};

export default CustomItemCard;

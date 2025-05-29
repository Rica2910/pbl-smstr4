import { View, Text, Image } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { addSampahToTong } from "../lib/action";

const CustomItemCard = ({ source, containerStyles, title, type, poin, unitType, imagesampah }) => {
  const addToTong = async () => {
    try {
      await addSampahToTong({ title, type, poin, unitType, imagesampah: "tv" });
      console.log(`${title} berhasil ditambahkan ke tong`);
    } catch (error) {
      console.error("Gagal menambahkan ke tong:", error);
    }
  };

  return (
    <View className={`w-60 h-80 justify-center items-center ${containerStyles}`}>
      <Image source={source} className="w-40 h-40" resizeMode="cover" />
      <Text className="font-psemibold text-xl">{title}</Text>
      <Text className="text-gray-100">{type}</Text>
      <Text>
        {poin} Poin / {unitType}
      </Text>

      <CustomButton
        title="Tambahkan"
        handlePress={addToTong}
        containerStyles="mt-5"
      />
    </View>
  );
};

export default CustomItemCard;

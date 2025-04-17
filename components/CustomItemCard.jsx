import { View, Text, Image } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { images } from "../constants";

const CustomItemCard = ({
  source,
  containerStyles,
  title,
  type,
  poin,
  unitType,
}) => {
  const addToTong = async (title) => {
    console.log(title + " berhasil ditambahkan kedalam tong");
  };

  return (
    <View
      className={`w-60 h-80 justify-center items-center ${containerStyles}`}
    >
      <Image source={images.cards} className="w-40 h-40" resizeMode="cover" />
      <Text className="font-psemibold text-xl">{title}</Text>
      <Text className="text-gray-100">{type}</Text>
      <Text>
        {poin} Poin / {unitType}
      </Text>

      <CustomButton
        title="Tambahkan"
        handlePress={() => addToTong(title)}
        containerStyles="mt-5"
      />
    </View>
  );
};

export default CustomItemCard;

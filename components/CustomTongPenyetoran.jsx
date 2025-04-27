import { View, Text, Image, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../constants";

const CustomTongCard = ({ data, containerStyles }) => {


  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className={`${containerStyles}`}>
          <View className="border border-secondary w-full px-3 ">
            <View className="mt-4 flex-row mb-4 items-center">
              <View className="justify-center flex-row">
                <Image
                  source={images.botol}
                  className="w-12 h-12 ml-3"
                  resizeMode="cover"
                />
              </View>
              <View className="pl-4">
                <Text className="font-bold">{item.title}</Text>
                <Text className="text-sm">{item.type}</Text>
                <Text className="text-red-500">{item.poin}</Text>
              </View>
              <View className="ml-auto justify-center">
                <CustomButton
                  title="Detail"
                  handlePress={() => router.push("penyetoran")}
                  containerStyles={" w-[80px] h-[40px]"}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default CustomTongCard;

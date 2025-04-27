import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { images, icons } from "../constants";

const CustomProfilHeader = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View className="flex-row items-center mt-10">
          <Image source={item.avatar} className="w-20 h-20 rounded-full" />
          <View className="pl-4">
            <View className="flex-row items-center">
              <Text className="font-pmedium text-2xl text-primary">
                {item.nama}
              </Text>
              <View
                className={`rounded-lg ${
                  item.tier === "Gold"
                    ? "bg-gold"
                    : item.tier === "Silver"
                    ? "bg-silver"
                    : "bg-bronze"
                }  justify-center items-center w-20 h-6 ml-2`}
              >
                <Text className="font-pmedium text-sm">{item.tier}</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="font-pmedium text-sm text-primary">
                {item.poin}{" "}
              </Text>
              <Image
                source={icons.poin}
                className="w-6 h-6"
                resizeMode="contain"a
              />
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default CustomProfilHeader;

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
          <Image
            className="w-20 h-20 rounded-full"
            source={{ uri: item.avatar_url }}
          />
          <View className="pl-4">
            <View className="flex-row items-center">
              <Text className="font-pmedium text-2xl text-primary">
                {item.nama}
              </Text>
              <View
                className={`rounded-lg ${
                  item.penukaran >= 1500
                    ? "bg-black"
                    : item.penukaran < 1500 && item.penukaran >= 1000
                    ? "bg-gold"
                    : item.penukaran < 1000 && item.penukaran >= 500
                    ? "bg-silver"
                    : "bg-bronze"
                }  justify-center items-center w-20 h-6 ml-2`}
              >
                <Text
                  className={`font-pmedium text-sm ${
                    item.penukaran >= 1500 ? "text-white" : ""
                  }`}
                >
                  {item.penukaran >= 1500
                    ? "Black"
                    : item.penukaran < 1500 && item.penukaran >= 1000
                    ? "Gold"
                    : item.penukaran < 1000 && item.penukaran >= 500
                    ? "Silver"
                    : "Bronze"}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="font-pmedium text-sm text-primary">
                {item.coin}{" "}
              </Text>
              <Image
                source={icons.poin}
                className="w-6 h-6"
                resizeMode="contain"
                a
              />
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default CustomProfilHeader;

import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const config = {
  storageId: "6805fcb3001db0d06f70",
  projectId: "6805f3350031a662e30f",
};

const getImageViewUrl = (bucketId, fileId, projectId) => {
  if (!fileId) return null;
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const CustomTongPenyetoran = ({ data, containerStyles }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        const imageUrl = getImageViewUrl(config.storageId, item.imagesampah, config.projectId);
        return (
          <View className={`${containerStyles}`}>
            <View className="border border-secondary w-full px-3">
              <View className="mt-4 flex-row mb-4 items-center">
                <View className="justify-center flex-row">
                  {imageUrl ? (
                    <Image
                      source={{ uri: imageUrl }}
                      className="w-12 h-12 ml-3"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-12 h-12 ml-3 bg-gray-300 justify-center items-center">
                      <Text>No Image</Text>
                    </View>
                  )}
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
                    containerStyles="w-[80px] h-[40px]"
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CustomTongPenyetoran;

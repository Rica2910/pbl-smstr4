import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

const config = {
  storageId: "6805fcb3001db0d06f70",
  projectId: "6805f3350031a662e30f",
};

const getImageViewUrl = (bucketId, fileId, projectId) => {
  if (!fileId) return null;
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const CustomTongCard = ({ data, containerStyles }) => {
  const [checked, setChecked] = useState(false);
  const imageUrl = getImageViewUrl(config.storageId, data.imagesampah, config.projectId);

  return (
    <View className={`${containerStyles}`}>
      <View className="border border-secondary w-full px-3">
        <View className="mt-4 flex-row mb-4 items-center">
          <View className="justify-center flex-row">
            <Pressable onPress={() => setChecked(!checked)}>
              <FontAwesome
                name={checked ? "check-square" : "square-o"}
                size={40}
                color={checked ? "#10b981" : "#ccc"}
              />
            </Pressable>
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
            <Text className="font-bold">{data.title}</Text>
            <Text className="text-sm">{data.type}</Text>
            <Text className="text-red-500">{data.poin}</Text>
          </View>
          <View className="ml-auto justify-center">
            <CustomButton
              title="Detail"
              handlePress={() =>
                router.push({
                  pathname: "/penyetoran",
                  params: { items: JSON.stringify([data]) },
                })
              }
              containerStyles="w-[80px] h-[40px]"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomTongCard;

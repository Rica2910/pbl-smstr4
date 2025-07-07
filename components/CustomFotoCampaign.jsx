import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";

const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const CustomFotoCampaign = ({ photo }) => {
  return (
    <View className="w-[80%] h-[150px] mt-5">
      <View className="w-full h-[130px] bg-secondary items-center justify-center rounded-xl overflow-hidden">
        <ImageBackground
          source={{
            uri: getImageUrl(photo),
          }}
          className="w-full h-full justify-end"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default CustomFotoCampaign;

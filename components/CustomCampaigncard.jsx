import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ImageBackground } from "react-native";

const config = {
  storageId: "6805fcb3001db0d06f70",
  projectId: "6805f3350031a662e30f",
};

const getImageViewUrl = (bucketId, fileId, projectId) => {
  if (!fileId) return null;
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};
const CustomCampaigncard = ({ title, id, tanggal, thumbnail, like }) => {
  const handlePress = () => {
    // router.push({
    //   pathname: "/detailcampaign",
    //   params: { title, id },
    // });
    console.log(thumbnail);
  };

  return (
    <Image
      source={{
        uri: getImageViewUrl(
          config.storageId,
          "6805f3350031a662e30f",
          config.projectId
        ),
      }}
      className="w-6 h-6"
      resizeMode="cover"
    />
    // <Pressable onPress={handlePress} className="items-center">
    //   <View className="w-[80%] h-[150px] mt-5">
    //     <Text className="mb-3">Tanggal {tanggal}</Text>
    //     <View className="w-full h-[130px] bg-secondary items-center justify-center rounded-xl">
    //       <Text className="font-bold">{title}</Text>
    //     </View>
    //   </View>
    // </Pressable>
  );
};

export default CustomCampaigncard;

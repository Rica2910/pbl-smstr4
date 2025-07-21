import { View, Text, Pressable, ImageBackground } from "react-native";
import { router } from "expo-router";
import CustomLikeButton from "./CustomLikeButton";
import React, { useEffect, useState } from "react";
import { fetchLike, likeCampaign, removeLike } from "../lib/appwrite";

const bucketId = "6805fcb3001db0d06f70";
const projectId = "6805f3350031a662e30f";

const getImageUrl = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const CustomCampaignCardUser = ({
  title,
  id,
  tanggal,
  thumbnail,
  like,
  userId,
  liked,
  setLiked,
}) => {
  const isLiked = liked[id];

  const handlePress = () => {
    router.push({
      pathname: "/detailcampaign",
      params: { title, id, userId, tanggal },
    });
  };

  const addLike = async () => {
    try {
      if (!isLiked) {
        likeCampaign({ campaign: id, user: userId });
        setLiked((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      } else {
        removeLike({ campaign: id, user: userId });
        setLiked((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable onPress={handlePress} className="items-center">
      <View className="w-[80%] h-[150px] mt-5">
        <Text className="mb-3">Tanggal {tanggal}</Text>
        <View className="w-full h-[130px] bg-secondary items-center justify-center rounded-xl overflow-hidden">
          <ImageBackground
            source={{
              uri: getImageUrl(thumbnail),
            }}
            className="w-full h-full justify-end"
            resizeMode="cover"
          >
            <View className="w-full p-4 bg-shadow justify-around items-center flex-row">
              <Text className="font-bold text-primary">{title}</Text>
              <CustomLikeButton
                like={like}
                user={userId}
                likeFunction={addLike}
                dislikeFunction={removeLike}
                liked={isLiked}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomCampaignCardUser;

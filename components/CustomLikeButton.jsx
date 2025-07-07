import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const CustomLikeButton = ({
  like,
  user,
  likeFunction,
  dislikeFunction,
  liked,
}) => {
  return (
    <TouchableOpacity onPress={likeFunction}>
      <Image
        source={liked ? icons.heart : icons.like}
        className="w-7 h-7"
        resizeMode="cover"
        style={liked ? "" : { tintColor: "#fff" }}
      />
    </TouchableOpacity>
  );
};

export default CustomLikeButton;

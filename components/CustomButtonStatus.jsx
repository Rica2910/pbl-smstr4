import { Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { icons } from "../constants";

const CustomButtonStatus = ({
  containerStyles,
  textStyles,
  isLoading,
  data,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={item.handlePress}
          activeOpacity={0.7}
          className={`justify-center items-center px-4  ${
            isLoading ? "opacity-50" : ""
          } ${containerStyles || ""}`}
          disabled={isLoading}
        >
          <Image
            source={item.icon}
            className="w-12 h-12"
            resizeMode="contain"
            style={{ tintColor: "#2dcd6e" }}
          />
          <Text
            className={`text-secondary font-pregular text-sm ${textStyles}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      horizontal
    />
  );
};

export default CustomButtonStatus;

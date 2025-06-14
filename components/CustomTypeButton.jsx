import { Text, TouchableOpacity, FlatList, View } from "react-native";
import React, { useState } from "react";

const CustomTypeButton = ({
  containerStyles,
  textStyles,
  isLoading,
  data,
  filterStatus,
  setFilterStatus,
}) => {
  const type = async (placeholder) => {
    setFilterStatus(placeholder);
    console.log(isActive.button, filterStatus);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View className="pr-2">
          <TouchableOpacity
            onPress={() => type(item)}
            activeOpacity={0.7}
            className={` ${
              item === filterStatus
                ? "bg-secondary border border-secondary"
                : "bg-primary border border-secondary"
            } rounded-xl min-h-[40px] max-w-[99px] justify-center items-center px-4  ${containerStyles} ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            <Text
              className={`${
                item === filterStatus ? "text-primary" : "text-secondary"
              } font-semibold text-xs ${textStyles}`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      horizontal
    />
  );
};

export default CustomTypeButton;

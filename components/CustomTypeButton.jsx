import { Text, TouchableOpacity, FlatList, View } from "react-native";
import React, { useState } from "react";

const CustomTypeButton = ({ containerStyles, textStyles, isLoading, data }) => {
  const [isActive, setIsActive] = useState({ button: "" });

  const type = async (placeholder) => {
    console.log(placeholder);
    setIsActive({ ...isActive, button: placeholder });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View className="pr-2">
          <TouchableOpacity
            onPress={() => type(item)}
            activeOpacity={0.7}
            className={` ${
              item === isActive.button
                ? "bg-secondary border border-secondary"
                : "bg-primary border border-secondary"
            } rounded-xl min-h-[40px] max-w-[90px] justify-center items-center px-4  ${containerStyles} ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            <Text
              className={`${
                item === isActive.button ? "text-primary" : "text-secondary"
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

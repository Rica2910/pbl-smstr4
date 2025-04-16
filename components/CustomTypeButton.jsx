import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomTypeButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` ${
        title === isActive.button
          ? "bg-secondary border border-secondary"
          : "bg-primary border border-secondary"
      } rounded-xl min-h-[40px] max-w-[90px] justify-center items-center px-4 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`${
          title === isActive.button ? "text-primary" : "text-secondary"
        } font-semibold text-xs ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomTypeButton;

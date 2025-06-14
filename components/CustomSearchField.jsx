import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import "../global.css";

const CustomSearchField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardStyles,
  onEndEditing,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full py-2 px-4 bg-primary border border-secondary rounded-2xl items-center flex-row focus:border-secondary">
        <TextInput
          className="flex-1 text-black font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardStyles}
          textAlignVertical="center"
          onEndEditing={onEndEditing}
        />
        <TouchableOpacity>
          <Image
            className="w-6 h-6"
            source={icons.search}
            resizemMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSearchField;

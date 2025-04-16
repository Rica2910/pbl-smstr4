import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import "../global.css";

const CustomFormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-16 px-4 bg-primary border border-secondary rounded-2xl items-center flex-row focus:border-secondary">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardStyles}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              tintColor="black"
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizemMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomFormField;

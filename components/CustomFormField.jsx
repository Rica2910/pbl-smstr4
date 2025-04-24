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
  regex,
  validationMessage,
  setEmailValidation,
  emailValidation,
  passwordValue,
  isEmpty,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessageError, setValidationMessageError] = useState();

  const validate = (value) => {
    const isValid = regex.test(value);
    if (!isValid) {
      setValidationMessageError(validationMessage);
      setEmailValidation(false);
    } else {
      setValidationMessageError();
      setEmailValidation(true);
    }
  };

  const confirmPassword = (value) => {
    if (passwordValue !== value) {
      setValidationMessageError(validationMessage);
    } else {
      setValidationMessageError();
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setValidationMessageError(validationMessage);
    } else {
      setValidationMessageError();
    }
  };

  const validateField = (value) => {
    if (!value) {
      setValidationMessageError(validationMessage);
    } else {
      setValidationMessageError();
    }
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className={`w-full h-16 px-4 bg-primary border rounded-2xl items-center flex-row focus:border-secondary ${
          !validationMessageError ? "border-secondary" : "border-red-500"
        }`}
      >
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardStyles}
          onEndEditing={
            title === "Email"
              ? () => validate(value)
              : placeholder === "Konfirmasi Password"
              ? () => confirmPassword(value)
              : title === "Password"
              ? () => validatePassword(value)
              : () => validateField(value)
          }
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
      <Text className="color-red-500 text-sm">{validationMessageError}</Text>
    </View>
  );
};

export default CustomFormField;

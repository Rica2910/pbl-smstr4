import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";

const CustomButtonStatus = ({ containerStyles, textStyles, isLoading, data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={item.handlePress}
          activeOpacity={0.7}
          className={`relative justify-center items-center px-4 mr-16 ${
            isLoading ? "opacity-50" : ""
          } ${containerStyles || ""}`}
          disabled={isLoading}
        >
          <View>
            <Image
              source={item.icon}
              className="w-12 h-12"
              resizeMode="contain"
              style={{ tintColor: "#2dcd6e" }}
            />
            {item.count > 0 && (
              <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {item.count}
                </Text>
              </View>
            )}
          </View>
          <Text className={`font-pmedium text-sm ${textStyles}`}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CustomButtonStatus;

import { View, Text, Image } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { icons } from "../constants";


const CustomRiwayatCard = ({
  source,
  containerStyles,
  title,
  type,
  poin,
  date,
  icon,
}) => {

    return (

        <View className="w-full items-center">
            <View className="w-[90%]  border border-secondary mt-5 rounded-lg pl-4 flex-row max-w-md ">
                <View className="w-16 h-16 bg-gray-200  mt-5 rounded-full items-center justify-center mb-4">
                <Image source={icon} className="w-10 h-10" resizeMode="contain" style={{tintColor : '#2dcd6e'}} />
                </View>
                <View className="flex-1 mt-5 px-4">
                    <View className="flex-row justify-between items-center">
                      <Text className="font-bold">{title}</Text>
                      <Text className="font-bold text-secondary">{poin}</Text>
                    </View>
                      <Text className="mt-2 mb-4 text-gray-600">{date}</Text>
                 </View>
             </View>
        </View>
        
    )
}

export default CustomRiwayatCard;
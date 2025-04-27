import { View, Text, Image, Pressable,} from "react-native";
import React, { useState } from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { images } from "../constants";


const CustomAlamatCard =  ({ 
        source,
        containerStyles,
        Tempat,
        wilayah, 
        Nama,
        NoHp, 
        Alamat, 
}) => {
 
    return (
        <View className="w-full px-3 bg-gray-50 justify-center">
            <Text className="mt-3 font-bold text-xl">Pilih Alamat</Text>
            <View className="w-[80%] mt-3 pl-3">
                <Text className="font-bold text-lg">{Tempat}</Text>
                <Text className="text-secondary">{wilayah}</Text>
                <Text>{Nama} <Text>{NoHp}</Text></Text>
                <Text>{Alamat}</Text>
            </View>
            <View className="w-[95%] mt-3 pl-3 bg-gray-200 mb-4">
                <Text className="font-bold text-lg">{Tempat}</Text>
                <Text className="text-secondary">{wilayah}</Text>
                <Text>{Nama} <Text>{NoHp}</Text></Text>
                <Text className="mb-2">{Alamat}</Text>
            </View>
            <View>

            </View>
        </View>
    )
}

export default CustomAlamatCard ;
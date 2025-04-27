import { View, Text, Image, Pressable, FlatList } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../constants";


const CustomSelesaiCard = ({data, containerStyles}) => {

    return (
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View className={`${containerStyles}`}>
                <View className="w-full bg-primary border border-secondary px-4 rounded-lg">
                    <View className="flex-row gap-3 items-center mt-3">

                        <Image source={item.image} className="w-16 h-16 " />
                        <View className="gap-1">
                            <Text className="font-bold text-lg">{item.title}</Text>
                            <Text>{item.Poin}</Text>
                            <Text>Kuantitas: <Text>{item.Kuantitas}</Text></Text>
                        </View>
                    </View>
                    <Text className="mt-3">{item.Tanggal}</Text>
                    <Text className="font-bold text-lg">{item.nama}</Text>
                    <View className="w-full flex-row  justify-between mt-3 ">
                        <Text className="font-bold ">jenis sampah</Text>
                        <Text className="font-bold ">Kuantitas</Text>
                        <Text className="font-bold ">Harga poin</Text>
                        <Text className="font-bold ">Total Poin</Text>
                    </View>
                    <View className="w-full flex-row  justify-between mt-2">
                        <Text>{item.title}</Text>
                        <Text>{item.Kuantitas}</Text>
                        <Text>{item.Poin}</Text>
                        <Text>{item.TotalPoin}</Text>
                    </View>

                    <View className="w-full py-[12px] px-3 bg-gray-200 mt-3 mb-5">
                        <Text className="font-bold text-xl">Total Poin: 28500 Poin</Text>
                    </View>
                </View>

            </View>

        )}
        
        
        />
    )


}


export default CustomSelesaiCard;
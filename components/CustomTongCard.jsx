import { View, Text, Image, Pressable,} from "react-native";
import React, { useState } from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { images } from "../constants";


const CustomTongCard=({
    containerStyles,
    title,
    type,
    poin,
}) => {

    const [checked, setChecked] = useState(false);
    

    const HapusSemua = async (title) => {
        console.log(title + " berhasil ditambahkan kedalam tong");
      };

    return (
        <View className = {`${containerStyles}`}>
            <View className="border border-secondary w-full px-3 ">
                  <View className="mt-4 flex-row mb-4 items-center">
                      <View className="justify-center flex-row">
                        <Pressable onPress={() => setChecked(!checked)}>
                          <FontAwesome
                             name={checked ? "check-square" : "square-o"}
                             size={40}
                             color={checked ? "#10b981" : "#ccc"}
                          />
                        </Pressable>   
                        <Image source={images.botol} className="w-12 h-12 ml-3" resizeMode="cover" />
                      </View>
                      <View className="pl-4">
                        <Text className="font-bold">{title}</Text>
                        <Text className="text-sm">{type}</Text>
                        <Text className="text-red-500">{poin}</Text>
                      </View>
                      <View className="ml-auto justify-center">
                        <CustomButton 
                         title="Detail"
                         handlePress={() => router.push('/sign-in')}
                         containerStyles={' w-[80px] h-[40px]'}
                        />
                      </View>
                 </View>                    
              </View>
        </View>
    )
}



export default CustomTongCard;
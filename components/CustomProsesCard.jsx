import { View, Text, Image, Pressable, FlatList } from "react-native";
import React from "react";
import "../global.css";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../constants";


const CustomProsesCard = ({ data, containerStyles }) => {
    return (
      <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
             <View className={`${containerStyles}`}>
                <View className="w-full border border-secondary bg-primary px-4 rounded-lg">
                        <Text className="mt-4 font-bold text-xl">Diproses</Text>
                        <View className="items-center justify-center border border-black-100 py-3 mt-3 rounded-lg">
                            <Image source={item.image}  className="w-16 h-16 "/>
                            <Text className="font-bold text-lg">{item.title}</Text>
                            <Text>{item.Tipe}</Text>
                            <Text>{item.Poin}</Text>
                        </View>
                        <View className=" border border-black-100 py-3 mt-3 px-4 gap-3 mb-3 rounded-lg">
                              <Text>
                                <Text className="font-bold">Total sampah</Text>: 1 sampah
                              </Text>
                              <Text>
                                 <Text className="font-bold">Sampah akan di jemput pada</Text>: 28 desember 2024 pukul 15:00 
                              </Text>
                              <CustomButton
                                   title="Lihat Rincian"
                                   handlePress={() => router.push("")}
                                   containerStyles={" w-full h-[40px] self-center rounded-xl"}
                              />
                              <Text>
                                <Text className="font-bold">No. Antrean</Text> : Antrian-004
                              </Text>
                        </View>
                </View>

             </View>


      )}
      
      
      />
    );
  };

export default CustomProsesCard;

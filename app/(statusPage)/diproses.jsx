import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import CustomProsesCard from "../../components/CustomProsesCard";
import { icons, images } from "../../constants";
import { router } from "expo-router";


const Proses = () => {
    const dummydata = [{
        id : "1",
        title : "Botol Plastik",
        Tipe : "Non-organik plastik",
        image : images.botol ,
        Poin : "1300 poin/kg"
    }]


    return (
        <SafeAreaView className="h-full bg-primary ">
            <FlatList
             data={dummydata}
             keyExtractor={(item) =>(item.id)}
             numColumns={1}
             renderItem={({ item }) => (
                <CustomProsesCard
                    data ={dummydata}
                    containerStyles="px-4"
                />
             )}
            />
        <StatusBar style="dark" backgroundColor="#fff" />
        </SafeAreaView>
    )

}

export default Proses;
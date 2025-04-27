import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import CustomSelesaiCard from "../../components/CustomSelesaiCard";

import { icons, images } from "../../constants";
import { router } from "expo-router";

const Selesai = () => {
    const dummydata = [{
        id : "1",
        title : "Botol kaca",
        Poin : "14500 poin/kg",
        Kuantitas : " 2",
        Tanggal : "27 desember 2024",
        nama : "eco",
        TotalPoin : "2900 poin",
        image : images.botol
    }]

    return (
        <SafeAreaView className="h-full bg-primary">
            <FlatList
             data={dummydata}
             keyExtractor={(item) =>(item.id)}
             numColumns={1}
             renderItem={({ item }) => (
                <CustomSelesaiCard
                 data = {dummydata}
                 containerStyles={"px-4"}
                />
             )}
            
            />
        </SafeAreaView>
    )

}

export default Selesai;
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/CustomButton";
import { Feather } from '@expo/vector-icons';


<SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         <View className="w-full h-full items-center">
            <Text className="mt-5 font-bold text-lg text-secondary">Riwayat transaksi</Text>
             <View className="w-[90%] mt-5 border border-secondary rounded-lg max-w-md">
                <Text className="mt-4 pl-4">Cari Transaksi</Text>
                <View className="flex-row justify-between items-center mt-5 px-4">
                  <Feather name="calendar" color="black" size={25} />
                  <Text>pilih jadwal</Text>
                  <Text>Bulan ini</Text>
                </View>
                <View className="w-[90%] max-w-md self-center h-1 bg-black mt-4"></View>
                <CustomButton 
                  title="Cari"
                  handlePress={() => router.push('/')}
                  containerStyles="mb-5 mt-3 w-[93%] self-center h-[45px]"
                />
             </View>
             <View className="w-[90%]  border border-secondary mt-5 rounded-lg pl-4 flex-row max-w-md ">
                <View className="w-16 h-16 bg-gray-200  mt-5 rounded-full items-center justify-center">
                  <Feather name="truck" color="green" size={25} />
                </View>
                <View className="flex-row mt-5 justify-between w-[80%] px-4 flex-wrap">
                  <Text  className="font-bold">Pick Up</Text>
                  <Text className="font-bold text-secondary">+4400 poin</Text>
                  <Text className="mt-3 mb-5"> 22 Oktober 2024:15:30 WIB </Text>
                </View>
             </View>
            
         </View>
      </ScrollView>
    </SafeAreaView>
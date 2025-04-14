import React from 'react'
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import Navbar from '../../components/Navbar';

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full">
          <Text className="font-bold text-[28px] text-black">
            Re-App
          </Text>

         <View className="w-[80%] max-w-md flex flex-col gap-4 mt-5">
                     {[
                       "Email",
                       "Masukkan nama",
                     ].map((placeholder, idx) => (
                       <View key={idx} className="bg-primary rounded-lg border border-gray-200 px-3 py-3">
                         <TextInput
                           placeholder={placeholder}
                           placeholderTextColor="gray"
                           style={{ fontSize: 12 }}
                         />
                       </View>
                     ))}
         
                     <TouchableOpacity
                       onPress={() => router.push('/sign-up')}
                       className="bg-secondary h-[45px] rounded-lg items-center justify-center"
                     >
                       <Text className="text-primary text-[16px]">Daftar</Text>
                     </TouchableOpacity>
                   </View>

          

          <View className="mt-2 flex-row">
            <Text className="text-gray-400">Belum punya akun?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className="text-secondary ml-1">Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View> 

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

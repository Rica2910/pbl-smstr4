import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Navbar from '../../components/Navbar';
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  return (
    <SafeAreaView className="h-full bg-gray-80">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Navbar title="Register" />

        <View className="items-center mt-5 px-4">
          <Text className="font-bold text-secondary text-[27px]">Daftar Akun</Text>

          
          <View className="w-full max-w-md flex flex-col gap-4 mt-5">
            {[
              "Email",
              "Masukkan nama",
              "Masukkan jenis bank",
              "Masukkan nama rekening",
              "Masukkan nomor rekening",
              "Masukkan password",
              "Konfirmasi password"
            ].map((placeholder, idx) => (
              <View key={idx} className="bg-primary rounded-lg border border-gray-200 px-3 py-3">
                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor="gray"
                  style={{ fontSize: 12 }}
                />
              </View>
            ))}

            <CustomButton 
              title="Daftar"
              handlePress={() => router.push('/sign-in')}
              containerStyles={' mt-3'}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

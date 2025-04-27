import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomRiwayatCard from "../../components/CustomRiwayatCard";
import { icons } from "../../constants";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";

const Riwayat = () => {
  const dummyData = [
    {
      id: "1",
      title: "Pick Up",
      date: "22 Oktober 2024:15:30 WIB",
      poin: "+4400 poin",
      icon: icons.truck,
    },
  ];

  const handleCalendarPress = () => {
    console.log("Calendar icon pressed");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <CustomRiwayatCard
            title={item.title}
            date={item.date}
            poin={item.poin}
            icon={item.icon}
            containerStyles="mt-5 px-4"
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="mt-5 font-bold text-lg text-center text-secondary">
              Riwayat transaksi
            </Text>

            <View className="w-[90%] mt-5 border border-secondary rounded-lg max-w-md self-center">
              <Text className="mt-4 pl-4">Cari Transaksi</Text>

              <View className="flex-row justify-between items-center mt-5 px-5">
                <TouchableOpacity onPress={handleCalendarPress}>
                  <Image source={icons.calendar} className="w-7 h-7" />
                </TouchableOpacity>
                <Text>pilih jadwal</Text>
                <Text>Bulan ini</Text>
              </View>

              <View className="w-[90%] max-w-md self-center h-1 bg-black mt-4" />

              <CustomButton
                title="Cari"
                handlePress={() => router.push("/")}
                containerStyles="mb-5 mt-3 w-[93%] self-center h-[45px]"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState title="Tidak ada riwayat" />
        )}
      
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Riwayat;

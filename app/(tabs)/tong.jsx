import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/CustomButton";
import { Feather, FontAwesome } from '@expo/vector-icons';
import CustomTongCard from "../../components/CustomTongCard";



const Tong = () => {
  const dummyData =
   [{
    id: '1',
    title: 'Botol Plastik',
    type: 'non-organik plastik',
    poin: 'Points: 1300',
   }];
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDeleteAll = () => {
        
  };

  return (
    <SafeAreaView className="h-full bg-primary">
        <FlatList
            data={dummyData}
            keyExtractor={(item) => item.id}
            numColumns={1}
            renderItem={({ item }) => (
             <CustomTongCard
              title={item.title}
              type={item.type}
              poin={item.poin}
              containerStyles="mt-5 px-4"
             />
           )}
           ListHeaderComponent={
            () => (
              <>
                <CustomButton
                  title="Tong Sampah"
                  handlePress={() => router.push('/')}
                  containerStyles={' mt-7 py-[20px] w-[95%] self-center rounded-none'}
                />
                <TouchableOpacity onPress={handleDeleteAll} className=" mt-3">
                  <Text className="text-red-500 px-4 text-lg">Hapus Semua</Text>
                  </TouchableOpacity>
              </>
            )
          }
          ListEmptyComponent={() => (
            <CustomEmptyState
              title="tong sedang kosong"
              subtitle="Tambahkan sampah agar tong terisi"
            />
          )}
        />       
    </SafeAreaView>
  );
};

export default Tong;

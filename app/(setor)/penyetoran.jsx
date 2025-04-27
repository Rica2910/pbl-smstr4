import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomAlamatCard from "../../components/CustomAlamatCard";
import CustomButton from "../../components/CustomButton";
import CustomTongCard from "../../components/CustomTongCard";
import CustomTongPenyetoran from "../../components/CustomTongPenyetoran";
import { icons } from "../../constants";
import { Picker } from "@react-native-picker/picker"; 
import { router } from "expo-router";

const DropdownForm = () => {
  const [selectedOption, setSelectedOption] = useState(""); 
  const tanggalPenjemputan = [
    { label: "Kamis, 19 Desember 2024", value: "19-12-2024" },
    { label: "Jumat, 20 Desember 2024", value: "20-12-2024" },
    { label: "sabtu, 21 Desember 2024", value: "21-12-2024" },
    
  ];
  

  return (
    <View className="mt-4">
      <Text className="font-bold text-xl">Pilih Tanggal Penjemputan</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        {tanggalPenjemputan.map((item, index) => (
      <Picker.Item key={index} label={item.label} value={item.value} />
))}

      </Picker>
        <Text>Jadwal penjemputan hanya akan dilakukan pada pukul 15:00 sesuai dengan jadwal yang anda pilih</Text>
    </View>
  );
};

const Penyetoran = () => {
  const dummyData = [
    {
      Tempat: "Rumah",
      wilayah: "Batu Aji",
      Nama: "Eco",
      NoHp: "0837377373",
      Alamat: "Legenda Malaka blok B12 no 10",
    },
  ];
  const dummyData2 = [
    {
      id: "1",
      title: "Botol Plastik",
      type: "non-organik plastik",
      poin: "1300 poin/kg",
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <FlatList
        data={dummyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CustomAlamatCard
            Tempat={item.Tempat}
            wilayah={item.wilayah}
            Nama={item.Nama}
            NoHp={item.NoHp}
            Alamat={item.Alamat}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex-row mb-5 justify-between mt-7">
              <Text className="font-bold text-xl">Alamat Penjemputan</Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <Text className="text-secondary">Tambah Alamat</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <View className="flex-row justify-between mt-7 px-2">
              <Text className="font-bold text-xl">Item Sampah</Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <Text className="text-secondary">Tambahkan Sampah?</Text>
              </TouchableOpacity>
            </View>
            <CustomTongPenyetoran
              data={dummyData2}
              containerStyles="mt-3 px-4"
            />
            <Text className="mt-4 font-bold text-xl">Foto Sampah</Text>
            <View className="w-16 h-16 mt-3 bg-secondary rounded-full justify-center items-center">
              <TouchableOpacity >
                <Image source={icons.camera} className="w-9 h-9"   resizeMode="contain" style={{tintColor : '#FFFFFF'}} />
              </TouchableOpacity>
            </View>
            <DropdownForm /> 
            <CustomButton
            title="Cari"
            handlePress={() => router.push("/")}
            containerStyles="mb-5 mt-3 w-[93%] self-center h-[45px]"
            />
          </>
        )}
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Penyetoran;

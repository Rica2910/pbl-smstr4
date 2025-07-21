import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomAlamatCard from "../../components/CustomAlamatCard";
import CustomButton from "../../components/CustomButton";
import CustomTongPenyetoran from "../../components/CustomTongPenyetoran";
import { icons } from "../../constants";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { handleSetor } from "../../lib/Penyetoranaction";
import { db, config, account } from "../../lib/appwrite";
import { Query } from "react-native-appwrite";

const DropdownForm = ({ selectedOption, setSelectedOption }) => {
  const tanggalPenjemputan = [
    { label: "silahkan pilih tanggal penjemputan", value: "" },
    { label: "Kamis", value: "Kamis" },
    { label: "Jumat", value: "Jumat" },
    { label: "Sabtu", value: "Sabtu" },
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
      <Text className="text-sm text-gray-600 mt-1">
        Jadwal penjemputan hanya dilakukan pada pukul 15:00 sesuai tanggal yang
        dipilih.
      </Text>
    </View>
  );
};

const fetchAlamatByUser = async () => {
  try {
    const authUser = await account.get();
    const accountId = authUser.$id;

    const userDoc = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", accountId)]
    );

    const userId = userDoc.documents[0].$id;
    console.log("User ID:", userId);

    const alamatDocs = await db.listDocuments(
      config.databaseId,
      config.alamatCollectionId
    );

    const filteredAlamat = alamatDocs.documents.filter((alamat) =>
      alamat.user?.some((u) => u.$id === userId)
    );

    console.log("Filtered Alamat:", filteredAlamat);
    return filteredAlamat;
  } catch (error) {
    console.error("Gagal fetch alamat:", error);
    return [];
  }
};

const Penyetoran = () => {
  const { items } = useLocalSearchParams();
  const parsedItems = items ? JSON.parse(items) : [];

  const [alamatList, setAlamatList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAlamatId, setSelectedAlamatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAlamatByUser();
      setAlamatList(result);
    };
    fetchData();
  }, []);

  const renderAlamat = ({ item }) => (
    <TouchableOpacity
      className={`border p-3 rounded-lg mb-2 ${
        selectedAlamatId === item.$id ? "border-green-800" : "border-gray-300"
      }`}
      onPress={() => setSelectedAlamatId(item.$id)}
    >
      <CustomAlamatCard
        Tempat={item.tempat_diterima}
        wilayah={item.kecamatan}
        Nama={item.nama_pengirim}
        NoHp={item.no_hp}
        Alamat={item.alamat_lengkap}
        isSelected={selectedAlamatId === item.$id}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <FlatList
        data={alamatList}
        keyExtractor={(item) => item.$id}
        renderItem={renderAlamat}
        ListHeaderComponent={() => (
          <View className="flex-row mb-5 justify-between mt-7">
            <Text className="font-bold text-xl">Alamat Penjemputan</Text>
            <TouchableOpacity onPress={() => router.push("/alamat")}>
              <Text className="text-secondary">Tambah Alamat</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View className="flex-row justify-between mt-7 px-2">
              <Text className="font-bold text-xl">Item Sampah</Text>
            </View>

            <CustomTongPenyetoran
              data={parsedItems}
              containerStyles="mt-3 px-4"
            />

            <DropdownForm
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            <CustomButton
              title="Setor"
              handlePress={() =>
                handleSetor(selectedOption, parsedItems, selectedAlamatId)
              }
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

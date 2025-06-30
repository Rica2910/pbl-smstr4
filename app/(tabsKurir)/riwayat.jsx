import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar } from "expo-status-bar";
import moment from "moment";

import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomRiwayatCard from "../../components/CustomRiwayatCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { fetchAllPenyetoran } from "../../lib/appwrite";

const Riwayat = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetchAllPenyetoran();
      const selesaiItems = result.filter((item) => item.status === "selesai");

      setAllData(selesaiItems);
      setFilteredData(selesaiItems); // tampilkan semua selesai secara default
    } catch (error) {
      console.log("Gagal mengambil data riwayat:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleSearch = () => {
    if (!selectedDate) return;

    const formatted = moment(selectedDate).format("DD MMMM YYYY");

    const hasilFilter = allData.filter((item) =>
      moment(item.$createdAt).format("DD MMMM YYYY").includes(formatted)
    );

    setFilteredData(hasilFilter);
    setSearched(true);
  };

  const displayDate = selectedDate
    ? moment(selectedDate).format("DD MMMM YYYY")
    : "pilih tanggal";

  const displayMonth = selectedDate
    ? moment(selectedDate).format("MMMM YYYY")
    : "bulan ini";

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.$id}
        numColumns={1}
        renderItem={({ item }) => (
          <CustomRiwayatCard
            title={item.title}
            date={moment(item.$createdAt).format("DD MMMM YYYY HH:mm")} // waktu asli
            poin={`+${item.poin} poin`}
            icon={icons.truck}
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
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                  <Image source={icons.calendar} className="w-7 h-7" />
                </TouchableOpacity>
                <Text>{displayDate}</Text>
                <Text>{displayMonth}</Text>
              </View>

              <View className="w-[90%] max-w-md self-center h-1 bg-black mt-4" />

              <CustomButton
                title="Cari"
                handlePress={handleSearch}
                containerStyles="mb-5 mt-3 w-[93%] self-center h-[45px]"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          searched ? (
            <CustomEmptyState title="Tidak ada hasil" />
          ) : (
            <CustomEmptyState title="Tidak ada riwayat" />
          )
        }
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Riwayat;

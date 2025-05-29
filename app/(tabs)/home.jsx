import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomItemCard from "../../components/CustomItemCard";
import CustomEmptyState from "../../components/CustomEmptyState";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [search, setSearch] = useState({
    search: "",
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); 
    setRefreshing(false);
  };

  const dummyData = [
    "Semua",
    "Elektronik",
    "Kaca",
    "Kertas",
    "Logam",
    "Minyak",
    "Plastik",
  ];

  const dummyData2 = [
  { id: "1", title: "Tv", type: "Elektronik", poin: 6500, unitType: "Unit", image: require("../../assets/images/tv.png")  },
  { id: "2", title: "Kulkas", type: "Elektronik", poin: "12000", unitType: "Unit", image: require("../../assets/images/kulkas.png") },
  { id: "3", title: "Monitor", type: "Elektronik", poin: "7000", unitType: "Unit", image: require("../../assets/images/monitor.png") },
];


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData2}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CustomItemCard
            source={item.image}
            title={item.title}
            poin={item.poin}
            type={item.type}
            unitType={item.unitType}
            containerStyles="mt-5"
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="mt-5 h-20 justify-center">
              <View className="flex-row">
                  <Text className="text-3xl font-pmedium">Selamat datang, </Text>
                  <Text className="text-3xl font-pmedium text-secondary">Aiman</Text>
              </View>


            </View>
            <CustomSearchField
              title="Search"
              placeholder="Cari sampah yang ingin ditambahkan"
              value={search.search}
              handleChangeText={(e) => setSearch({ ...search, search: e })}
            />

            <CustomTypeButton data={dummyData} containerStyles="mt-2" />
          </View>
        )}
        ListEmptyComponent={() => (
          <CustomEmptyState
            title="Jenis sampah yang anda cari tidak ada"
            subtitle="Silahkan hubungi admin agar jenis sampah tersebut ditambahkan"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Home;
import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomItemCard from "../../components/CustomItemCard";
import CustomEmptyState from "../../components/CustomEmptyState";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dummyData = [
    "Semua",
    "Elektronik",
    "Kaca",
    "Kertas",
    "Logam",
    "Minyak",
    "Plastik" ?? [],
  ];

  const dummyData2 = ["Tv", "Kulkas", "Monitor"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={dummyData2}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <CustomItemCard
            title={item}
            poin="6500"
            type="Elektronik"
            unitType="Unit"
            containerStyles="mt-5"
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="mt-5 h-20 justify-center">
              <Text className="text-3xl font-pmedium">
                Welcome, <Text className="text-secondary">Rifad</Text>
              </Text>
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
    </SafeAreaView>
  );
};

export default Home;

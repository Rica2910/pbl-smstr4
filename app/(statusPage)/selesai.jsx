import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomProsesCard from "../../components/CustomProsesCard";
import { db, config } from "../../lib/appwrite";
import { Query } from "appwrite";

const Selesai = () => {
  const [dataSelesai, setDataSelesai] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataSelesai = async () => {
    try {
      const response = await db.listDocuments(
        config.databaseId,
        config.penyetoranCollectionId,
        [Query.equal("status", "selesai")]
      );
      setDataSelesai(response.documents);
    } catch (error) {
      console.error("Gagal mengambil data selesai:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSelesai();
  }, []);

  return (
    <SafeAreaView className="h-full bg-primary">
      {loading ? (
        <ActivityIndicator size="large" color="#10b981" className="mt-10" />
      ) : dataSelesai.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-lg text-gray-500">Belum ada item</Text>
        </View>
      ) : (
        <FlatList
          data={dataSelesai}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <CustomProsesCard data={item} containerStyles="px-4" />
          )}
        />
      )}
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Selesai;

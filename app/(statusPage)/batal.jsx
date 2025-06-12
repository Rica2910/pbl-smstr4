import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomSelesaiCard from "../../components/CustomSelesaiCard";
import { db, config } from "../../lib/appwrite";
import { Query } from "appwrite";

const Batal = () => {
  const [dataBatal, setDataBatal] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataBatal = async () => {
    try {
      const response = await db.listDocuments(
        config.databaseId,
        config.penyetoranCollectionId,
        [Query.equal("status", "batal")]
      );
      setDataBatal(response.documents);
    } catch (error) {
      console.error("Gagal mengambil data batal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBatal();
  }, []);

  return (
    <SafeAreaView className="h-full bg-primary">
      {loading ? (
        <ActivityIndicator size="large" color="#10b981" className="mt-10" />
      ) : dataBatal.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-lg text-gray-500">Belum ada item</Text>
        </View>
      ) : (
        <FlatList
          data={dataBatal}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <CustomSelesaiCard data={item} containerStyles="px-4" />
          )}
        />
      )}
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Batal;

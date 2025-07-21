import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";

import { fetchAllPenyetoran } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";

const DetailRiwayat = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const config = {
    storageId: "6805fcb3001db0d06f70",
    projectId: "6805f3350031a662e30f",
  };

  const getImageViewUrl = (bucketId, fileId, projectId) => {
    if (!fileId) return null;
    return "https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}";
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const allData = await fetchAllPenyetoran();
      const item = allData.find((item) => item.$id === id);

      setData(item);
      setLoading(false);
    } catch (error) {
      console.log("Gagal mengambil detail:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2">Mengambil data...</Text>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary">
        <Text className="text-red-500">Data tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <ScrollView className="mt-5 px-4">
        <Text className="text-xl font-bold text-secondary text-center mb-4">
          Detail Riwayat
        </Text>

        {data?.imagesampah ? (
          <Image
            source={{
              uri: getImageViewUrl(
                config.storageId,
                data.imagesampah,
                config.projectId
              ),
            }}
            className="w-full h-52 rounded-xl mb-4"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-52 bg-gray-300 rounded-xl mb-4 justify-center items-center">
            <Text className="text-gray-500">Gambar tidak tersedia</Text>
          </View>
        )}

        <View className="bg-white p-4 rounded-xl shadow-md">
          <Text className="text-base text-black mb-2">
            <Text className="font-semibold">Judul:</Text> {data.title}
          </Text>
          <Text className="text-base text-black mb-2">
            <Text className="font-semibold">Tanggal:</Text>{" "}
            {moment(data.$createdAt).format("DD MMMM YYYY HH:mm")}
          </Text>
          <Text className="text-base text-black mb-2">
            <Text className="font-semibold">Status:</Text> {data.status}
          </Text>
          <Text className="text-base text-black mb-2">
            <Text className="font-semibold">Poin:</Text> +{data.poin} poin
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailRiwayat;

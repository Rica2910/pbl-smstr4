import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { updateDocumentPenyetoran } from "../../lib/Penyetoranaction";
import { fetchCekDataPenyetoran } from "../../lib/appwrite";

const ValidasiPenyetoran = () => {
  const bucketId = "6805fcb3001db0d06f70";
  const projectId = "6805f3350031a662e30f";
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (fileId) => {
    return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
  };

  const getData = async () => {
    if (id) {
      const result = await fetchCekDataPenyetoran(id);
      setData(result);
     
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleKirimKurir = async () => {
    try {
      setLoading(true);
      await updateDocumentPenyetoran(id, {
        status: "Menunggu Penjemputan",
      });
      Alert.alert("Sukses", "Kurir akan menjemput");
      await getData();
    } catch (error) {
      console.error("Gagal update status:", error);
      Alert.alert("Error", "Gagal menyetujui penyetoran.");
    } finally {
      setLoading(false);
    }
  };

  const handleBatal = async () => {
    try {
      setLoading(true);
      await updateDocumentPenyetoran(id, {
        status: "Tidak Setuju",
      });
      Alert.alert("Sukses", "Tidak menyetujui penjemputan");
      await getData();
    } catch (error) {
      console.error("Gagal update status:", error);
      Alert.alert("Error", "Gagal menyetujui penyetoran.");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="border border-secondary rounded-lg w-[80%] self-center ">
        {data.imagesampah && (
          <Image
            source={{ uri: getImageUrl(data.imagesampah) }}
            style={{
              width: "100%",
              height: 160,
              borderRadius: 10,
              marginTop: 20,
            }}
            resizeMode="cover"
          />
        )}
        <View className="ml-9 gap-3 mb-5 mt-3">
          <Text className="font-bold text-lg">Sampah: {data.title}</Text>
          <Text className="font-bold text-lg">Jenis: {data.type}</Text>
          <Text className="font-bold text-lg">
            Penyumbang: {data.users?.nama}
          </Text>
          <Text className="font-bold text-lg">ID Penyetoran: {data.$id}</Text>

          {data.alamat ? (
            <View className="mt-2">
              <Text className="font-bold text-lg">Alamat Penjemputan:</Text>
              <Text className="text-base ml-2">
                Nama: {data.alamat.nama_pengirim}
              </Text>
              <Text className="text-base ml-2">No HP: {data.alamat.no_hp}</Text>
              <Text className="text-base ml-2">
                Alamat: {data.alamat.alamat_lengkap}
              </Text>
              <Text className="text-base ml-2">
                Kecamatan: {data.alamat.kecamatan}
              </Text>
            </View>
          ) : (
            <Text className="font-bold text-lg">Alamat: Tidak tersedia</Text>
          )}

          <Text className="font-bold text-lg mt-2">Status: {data.status}</Text>
          <Text className="font-bold text-lg mt-2">
            Tanggal Penjemputan: {data.tanggalPenjemputan}
          </Text>
        </View>

        <View>
          {data.status === "Menunggu Persetujuan" ? (
            <TouchableOpacity
              onPress={handleKirimKurir}
              disabled={loading}
              className="bg-green-600 py-3 rounded-xl mx-8 mb-4"
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? "Mengirim..." : "setujui"}
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )}

          {data.status === "Tidak Setuju" || data.status === "Selesai" ? (
            ""
          ) : (
            <TouchableOpacity
              onPress={handleBatal}
              disabled={loading}
              className="bg-red-600 py-3 rounded-xl mx-8 mb-4"
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? "Mengirim..." : "Tidak Setuju"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ValidasiPenyetoran;

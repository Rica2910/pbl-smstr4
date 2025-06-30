import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import {
  uploadBuktiFotoKurir,
  updateFotoKurirPenyetoran,
  updateDocumentPenyetoran,
  tambahPoinKeUser,
  tambahPenukaranKeUser
} from "../../lib/Penyetoranaction";
import { fetchDataPenyetoran } from "../../lib/appwrite";
import { icons } from "../../constants";

const DetailAlamat = () => {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      const result = await fetchDataPenyetoran(id);
      setData(result);
    };
    getData();
  }, [id]);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Izin Kamera Ditolak", "Silakan aktifkan izin kamera di pengaturan.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.3,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Gagal buka kamera:", err);
      Alert.alert("Gagal membuka kamera", err.message || "Terjadi kesalahan.");
    }
  };

  const handleSelesai = async () => {
    try {
      if (!imageUri) {
        Alert.alert("Peringatan", "Silakan upload bukti foto terlebih dahulu.");
        return;
      }

      const fileAsset = {
        uri: imageUri,
        mimeType: "image/jpeg",
        fileSize: 360000,
      };

      const fileId = await uploadBuktiFotoKurir(fileAsset);

      await updateFotoKurirPenyetoran(id, fileId);
      await updateDocumentPenyetoran(id, { status: "selesai" });
      

      console.log(" ID User dari penyetoran:", data.users);
      console.log("Poin yang akan ditambahkan:", data.poin);

      await tambahPoinKeUser(data.users.$id, data.poin || 0);
      await tambahPenukaranKeUser(data.users.$id);


      Alert.alert("Berhasil", "Penjemputan selesai dan poin ditambahkan.");
      router.back();
    } catch (error) {
      console.error("Gagal menyelesaikan:", error);
      Alert.alert("Error", "Gagal menyelesaikan penjemputan.");
    }
  };

  const openNavigation = (latitude, longitude) => {
    if (!latitude || !longitude) {
      Alert.alert("Lokasi tidak tersedia", "Alamat ini belum memiliki titik koordinat.");
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  if (!data) return <Text className="text-center mt-10">Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="border border-secondary rounded-lg px-4 py-3 mt-[98px] w-[90%] self-center">
        <Text className="font-bold text-lg mb-2">Detail Alamat Penjemputan</Text>

        <View className="gap-1">
          <Text>Nama: {data.alamat.nama_pengirim}</Text>
          <Text>No HP: {data.alamat.no_hp}</Text>
          <Text>Alamat: {data.alamat.alamat_lengkap}</Text>
          <Text>Kecamatan: {data.alamat.kecamatan}</Text>
        </View>

        {data.alamat.latitude && data.alamat.longitude && (
          <View style={{ height: 200, marginTop: 15, borderRadius: 10, overflow: "hidden" }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: data.alamat.latitude,
                longitude: data.alamat.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: data.alamat.latitude,
                  longitude: data.alamat.longitude,
                }}
                title="Lokasi Penjemputan"
              />
            </MapView>
          </View>
        )}

        <TouchableOpacity
          onPress={() => openNavigation(data.alamat.latitude, data.alamat.longitude)}
          className="mt-4 bg-secondary rounded-lg py-2 px-4 self-start"
        >
          <Text className="text-white font-semibold text-center">buka map</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} className="items-center mt-6">
          <View style={{ backgroundColor: "green", borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Image source={icons.camera} style={{ width: 30, height: 30, tintColor: "#fff" }} resizeMode="contain" />
          </View>
          <Text className="text-center text-sm mt-1 text-gray-500">Upload Bukti Foto</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: 200, marginTop: 10, borderRadius: 10 }}
          />
        )}

        <TouchableOpacity
          onPress={handleSelesai}
          className="bg-secondary p-3 rounded-lg mt-4 mb-3"
        >
          <Text className="text-white text-center font-bold">Selesai</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailAlamat;

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomFormField from "../../components/CustomFormField";
import {
  cekDataPenukaran,
  registerPengelolaDanKurir,
  updatePenukaranRequest,
} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import * as ImagePicker from "expo-image-picker";
import CustomButtonFoto from "../../components/CustomButtonFoto";
import { useLocalSearchParams } from "expo-router";

const ValidasiPenukaran = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useLocalSearchParams();

  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [selectedOption, setSelectedOption] = useState("Kurir Sampah");
  const [imagePick, setImagePick] = useState();
  const [data, setData] = useState();
  const placeHolderImage = require("../../assets/images/empty.png");

  const validateData = async () => {
    if (id) {
      const result = await cekDataPenukaran(id);
      setData(result);
    }
  };

  useEffect(() => {
    validateData();
  }, [id]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        setImagePick("");
        Alert.alert("Peringatan", "Kamu tidak memilih gambar");
        return;
      }

      setImagePick(result.assets[0]);
    } catch (error) {
      setImagePick(null);
      console.log(error);
    }
  };

  const submit = async () => {
    if (!imagePick)
      Alert.alert("Error", "semua tabel wajib ter-isi terlebih dahulu");

    setIsSubmitting(true);
    try {
      const result = await updatePenukaranRequest(id, imagePick);
      Alert.alert("Berhail", "Bukti traksaksi berhasil di upload");

      router.push("/penukaranKoin");
    } catch (error) {
      console.log(error);
    } finally {
      setImagePick(null);
      setIsSubmitting(false);
    }
  };

  const handleBatal = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center mt-5 px-4 h-full w-full">
          <Text className="font-bold text-secondary text-[27px]">
            Validasi Penukaran koin
          </Text>

          <View className="w-full max-w-md flex flex-col gap-4 mt-5">
            <View className="bg-primary rounded-lg px-3">
              <CustomButtonFoto
                onPress={pickImage}
                imagePick={imagePick}
                placeHolderImage={placeHolderImage}
                title={"Foto Sampah"}
                placeHolder={"silahkan masukkan bukti transaksi"}
              />
            </View>

            <CustomButton
              title="Daftar"
              handlePress={submit}
              containerStyles={" mt-3 h-[55px]"}
              isLoading={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ValidasiPenukaran;

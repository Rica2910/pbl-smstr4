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
import { createCampaign } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import * as ImagePicker from "expo-image-picker";
import CustomButtonFoto from "../../components/CustomButtonFoto";
import CustomSelectForm from "../../components/CustomSelectForm";
import { useLocalSearchParams } from "expo-router";

const addCampaign = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    judul: "",
  });

  const { user } = useGlobalContext();
  const [selectedOption, setSelectedOption] = useState("Publik");
  const [imagePick, setImagePick] = useState();
  const placeHolderImage = require("../../assets/images/empty.png");

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
    if (!imagePick || !form.judul)
      Alert.alert("Error", "semua tabel wajib ter-isi terlebih dahulu");

    setIsSubmitting(true);
    try {
      const userId = user.$id;
      console.log(form.judul);
      const result = await createCampaign({
        imagePick: imagePick,
        judul: form.judul,
        selectedOption: selectedOption,
        userId: userId,
      });
      Alert.alert("Berhail", "Campaign berhasil diterbitkan");

      router.push("/campaignAdmin");
    } catch (error) {
      console.log(error);
    } finally {
      setImagePick(null);
      setIsSubmitting(false);
    }
  };

  const dropDownList = [
    { role: "Publik", value: "Publik" },
    { role: "khusus Pengelola", value: "khusus Pengelola" },
  ];

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center mt-5 px-4 h-full w-full">
          <Text className="font-bold text-secondary text-[27px]">Campaign</Text>

          <View className="w-full max-w-md flex flex-col gap-4 mt-5 items-center">
            <View className="bg-primary rounded-lg px-3 w-full">
              <CustomFormField
                title="Judul"
                placeholder="Judul"
                value={form.judul}
                handleChangeText={(e) => setForm({ ...form, judul: e })}
                otherStyles="mt-3"
                validationMessage="mohon tabel judul di-isi"
              />

              <Text className="text-black font-bold text-xl">
                Status Campaign
              </Text>
              <CustomSelectForm
                selectedOption={selectedOption}
                dropDownList={dropDownList}
                setSelectedOption={setSelectedOption}
              />
            </View>
            <CustomButtonFoto
              onPress={pickImage}
              imagePick={imagePick}
              placeHolderImage={placeHolderImage}
              title={"Thumbnail"}
              placeHolder={"silahkan masukkan thumbnail"}
            />

            <CustomButton
              title="Terbitkan"
              handlePress={submit}
              containerStyles={" mt-3 h-[55px] w-full"}
              isLoading={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addCampaign;

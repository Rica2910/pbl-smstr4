import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/CustomButton";
import CustomFormField from "../../components/CustomFormField";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    nama: "",
    bank: "",
    namaRekening: "",
    nomorRekening: "",
    password: "",
    konfirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = async () => {
    console.log("pendaftaran berhasil");
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center mt-5 px-4 h-full w-full">
          <Text className="font-bold text-secondary text-[27px]">
            Daftar Akun
          </Text>

          <View className="w-full max-w-md flex flex-col gap-4 mt-5">
            <View className="bg-primary rounded-lg px-3">
              <CustomFormField
                title="Email"
                placeholder="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Nama"
                placeholder="Nama"
                value={form.nama}
                handleChangeText={(e) => setForm({ ...form, nama: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Bank"
                placeholder="Bank"
                value={form.bank}
                handleChangeText={(e) => setForm({ ...form, bank: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Nama Rekening"
                placeholder="Nama Rekening"
                value={form.namaRekening}
                handleChangeText={(e) => setForm({ ...form, namaRekening: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Nomor Rekening"
                placeholder="Nomor Rekening"
                value={form.nomorRekening}
                handleChangeText={(e) => setForm({ ...form, nomorRekening: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Password"
                placeholder="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
              />
              <CustomFormField
                title="Password"
                placeholder="Konfirmasi Password"
                value={form.konfirmPassword}
                handleChangeText={(e) =>
                  setForm({ ...form, konfirmPassword: e })
                }
                otherStyles="mt-7"
              />
            </View>

            <CustomButton
              title="Daftar"
              handlePress={register}
              containerStyles={" mt-3 h-[55px]"}
            />
          </View>
          <View className="mt-2 flex-row">
            <Text className="text-gray-400">Sudah punya akun?</Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-secondary ml-1">Login di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

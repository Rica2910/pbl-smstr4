import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/CustomButton";
import CustomFormField from "../../components/CustomFormField";
import { createUser } from "../../lib/appwrite";

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
  const [emailValidation, setEmailValidation] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = async () => {
    if (
      !form.email ||
      !form.nama ||
      !form.bank ||
      !form.namaRekening ||
      !form.nomorRekening ||
      !form.password ||
      !form.konfirmPassword
    ) {
      Alert.alert("Error", "semua tabel wajib ter-isi terlebih dahulu");
    } else if (emailValidation === false) {
      Alert.alert("Error", "Email tidak valid");
    } else if (form.password.length < 8) {
      Alert.alert("Error", "Password minimal terdiri dari 8 huruf");
    } else if (form.password !== form.konfirmPassword) {
      Alert.alert("Error", "Sandi tidak sama");
    } else {
      setIsSubmitting(true);
      try {
        await createUser({
          email: form.email,
          nama: form.nama,
          bank: form.bank,
          namaRekening: form.namaRekening,
          nomorRekening: form.nomorRekening,
          password: form.password,
        });
        router.replace("/home");
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
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
                otherStyles="mt-3"
                keyboardStyles="email-address"
                regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                emailValidation={emailValidation}
                setEmailValidation={setEmailValidation}
                validationMessage="mohon masukkan email yang valid"
              />
              <CustomFormField
                title="Nama"
                placeholder="Nama"
                value={form.nama}
                handleChangeText={(e) => setForm({ ...form, nama: e })}
                otherStyles="mt-3"
                validationMessage="mohon tabel nama di-isi"
              />
              <CustomFormField
                title="Bank"
                placeholder="Bank"
                value={form.bank}
                handleChangeText={(e) => setForm({ ...form, bank: e })}
                otherStyles="mt-3"
                validationMessage="mohon tabel Bank di-isi"
              />
              <CustomFormField
                title="Nama Rekening"
                placeholder="Nama Rekening"
                value={form.namaRekening}
                handleChangeText={(e) => setForm({ ...form, namaRekening: e })}
                otherStyles="mt-3"
                validationMessage="mohon tabel nama rekening di-isi"
              />
              <CustomFormField
                title="Nomor Rekening"
                placeholder="Nomor Rekening"
                value={form.nomorRekening}
                handleChangeText={(e) => setForm({ ...form, nomorRekening: e })}
                otherStyles="mt-3"
                validationMessage="mohon tabel nomor rekening di-isi"
              />
              <CustomFormField
                title="Password"
                placeholder="Password (minimal 8 huruf)"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-3"
                validationMessage="Password harus memiliki minimal 8 huruf"
              />
              <CustomFormField
                title="Password"
                placeholder="Konfirmasi Password"
                value={form.konfirmPassword}
                handleChangeText={(e) =>
                  setForm({ ...form, konfirmPassword: e })
                }
                passwordValue={form.password}
                otherStyles="mt-3"
                validationMessage="Password tidak sama"
              />
            </View>

            <CustomButton
              title="Daftar"
              handlePress={register}
              containerStyles={" mt-3 h-[55px]"}
              isLoading={isSubmitting}
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

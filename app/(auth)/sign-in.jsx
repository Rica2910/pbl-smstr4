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
import "../../global.css";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import CustomFormField from "../../components/CustomFormField";
import { currentActiveAccount, signIn, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const { setUser, setIsLoggedIn, user } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "semua tabel wajib ter-isi terlebih dahulu");
      return;
    }
    if (!emailValidation) {
      Alert.alert("Error", "Email tidak valid");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      const result = await currentActiveAccount();
      setUser(result);
      setIsLoggedIn(true);

      if (result.role === "Pengelola Sampah") {
        router.replace("/homeAdmin");
      } else if (result.role === "Kurir Sampah") {
        router.replace("/homeKurir");
      } else {
        router.replace("/home");
      }
    } catch (error) {
      console.log("Error saat login:", error);
      if (error.message.includes("Rate limit")) {
        Alert.alert(
          "Terlalu banyak percobaan",
          "Tunggu beberapa saat sebelum mencoba lagi."
        );
      } else {
        Alert.alert("Login gagal", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full">
          <Text className="font-bold text-[28px] text-black">Re-App</Text>

          <View className="w-[80%] max-w-md flex flex-col gap-4 mt-5">
            <View className="bg-primary rounded-lg">
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
                title="Password"
                placeholder="Password"
                value={form.password}
                passwordValue={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-3"
              />
            </View>

            <CustomButton
              title={"Login"}
              containerStyles={"mt-3 h-[50px]"}
              handlePress={submit}
              isLoading={isSubmitting}
            />
          </View>

          <View className="mt-2 flex-row">
            <Text className="text-gray-400">Belum punya akun?</Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text-secondary ml-1">Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

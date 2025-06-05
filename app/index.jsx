import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/globalProvider";

export default function App() {
  const { isLoggedIn, isLoading, user } = useGlobalContext();

  if (isLoggedIn && !isLoading)
    return (
      <Redirect
        href={`${user.role === "Pengelola Sampah" ? "/homeAdmin" : "/home"}`}
      />
    );

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4">
          <Text className="text-3xl color-black font-bold">
            Membantu pengendalian sampah bersama{" "}
            <Text className="color-secondary">Re-App</Text>
          </Text>

          <View className="mt-4 justify-center items-center">
            <Text className="text-sm font-pregular text-center">
              Dimana kebersihan dan kenyamanan bertemu: Mari bergabung dalam
              komunitas yang tak terbatas di{" "}
              <Text className="color-secondary">Re-App</Text>
            </Text>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={" mt-7 h-[55px]"}
            />
          </View>

          <StatusBar style="dark" backgroundColor="#fff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

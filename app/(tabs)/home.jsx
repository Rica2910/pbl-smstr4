import { View, Text, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchField from "../../components/CustomSearchField";
import CustomTypeButton from "../../components/CustomTypeButton";
import CustomItemCard from "../../components/CustomItemCard";

const Home = () => {
  const [search, setSearch] = useState({
    search: "",
  });

  const [isActive, setIsActive] = useState({ button: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const type = async (placeholder) => {
    console.log(placeholder);
    setIsActive({ ...isActive, button: placeholder });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full px-4">
          <CustomSearchField
            title="Search"
            value={search.search}
            handleChangeText={(e) => setSearch({ ...search, search: e })}
            otherStyles="mt-7"
          />
          <View className="flex-row flex-wrap gap-1">
            {[
              "Semua",
              "Elektronik",
              "Kaca",
              "Kertas",
              "Logam",
              "Minyak",
              "Plastik",
            ].map((placeholder, idx) => (
              <CustomTypeButton
                title={placeholder}
                key={idx}
                setIsActive={setIsActive}
                isActive={isActive}
                handlePress={() => type(placeholder)}
                containerStyles="mt-3"
              />
            ))}
          </View>
          <View className="flex-row justify-between flex-wrap">
            {["Monitor", "Tv", "Speaker"].map((placeholder, idx) => (
              <CustomItemCard
                source="lala"
                key={idx}
                containerStyles="mt-5"
                title={placeholder}
                type="Elektronik"
                poin="65000"
                unitType="unit"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

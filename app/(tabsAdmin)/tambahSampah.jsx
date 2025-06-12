import { useState, } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomFormField from "../../components/CustomFormField";
import { icons } from "../../constants";


const Tambahsampah = () => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    unitType: "",
    poin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1  }}>
        <View className="items-center justify-center mt-5 px-4 h-full w-full">
          <Text className="font-bold text-secondary text-[27px]">
            Tambah Sampah
          </Text>

          <View className="w-full max-w-md flex flex-col gap-4 mt-5">
            <View className="bg-primary rounded-lg px-3">

              <CustomFormField
                title="Title"
                placeholder="Nama Sampah"
                value={form.title}
                handleChangeText={(e) => setForm({ ...form, title: e })}
                otherStyles="mt-3"
                validationMessage="Mohon isi nama sampah"
              />

              <CustomFormField
                title="Type"
                placeholder="Jenis Sampah"
                value={form.type}
                handleChangeText={(e) => setForm({ ...form, type: e })}
                otherStyles="mt-3"
                validationMessage="Mohon isi type"
              />

              <CustomFormField
                title="Unit Type"
                placeholder="Satuan"
                value={form.unitType}
                handleChangeText={(e) => setForm({ ...form, unitType: e })}
                otherStyles="mt-3"
                validationMessage="Mohon isi unitType"
              />

              <CustomFormField
                title="Poin"
                placeholder="Masukkan jumlah poin"
                value={form.poin}
                handleChangeText={(e) =>
                  setForm({ ...form, poin: e.replace(/[^0-9.]/g, "") })
                }
                keyboardType="numeric"
                otherStyles=""
                validationMessage="Mohon isi poin dengan angka"
              />

              <TouchableOpacity>
                <Image
                  source={icons.camera}
                  className="w-9 h-9"
                  resizeMode="contain"
                  style={{ tintColor: "#FFFFFF" }}
                />
              </TouchableOpacity>

              <CustomButton
                title="Tambahkan"
                handlePress={() => tambahalamat(form, setIsSubmitting)}
                containerStyles={"mt-3 h-[55px]"}
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tambahsampah;

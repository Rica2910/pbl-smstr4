import  { useState,  } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomFormField from "../../components/CustomFormField";
import tambahalamat from "../../lib/tambahalamat"; 

  





const Alamat = () => {
  const [form, setForm] = useState({
    tempat_diterima: "",
    nama_pengirim: "",
    no_hp: "",
    kecamatan: "",
    alamat_lengkap: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);



  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center mt-5 px-4 h-full w-full">
          <Text className="font-bold text-secondary text-[27px]">
            Alamat Penjempu
          </Text>

          <View className="w-full max-w-md flex flex-col gap-4 mt-5">
            <View className="bg-primary rounded-lg px-3">

              <CustomFormField
                title="Nama Pengirim"
                placeholder="Nama Pengirim"
                value={form.nama_pengirim}
                handleChangeText={(e) =>
                  setForm({ ...form, nama_pengirim: e })
                }
                otherStyles="mt-3"
                validationMessage="Mohon isi nama pengirim"
              />

              <CustomFormField
                title="No HP"
                placeholder="No HP"
                value={form.no_hp}
                handleChangeText={(e) => setForm({ ...form, no_hp: e })}
                otherStyles="mt-3"
                validationMessage="Mohon isi nomor HP"
              />

              <CustomFormField
                title="Tempat Diterima"
                placeholder="Tempat Diterima"
                value={form.tempat_diterima}
                handleChangeText={(e) =>
                  setForm({ ...form, tempat_diterima: e })
                }
                otherStyles="mt-3"
                validationMessage="Mohon isi tempat diterima"
              />

              <CustomFormField
                title="Kecamatan"
                placeholder="Kecamatan"
                value={form.kecamatan}
                handleChangeText={(e) => setForm({ ...form, kecamatan: e })}
                otherStyles="mt-3"
                validationMessage="Mohon isi kecamatan"
              />

              <CustomFormField
                title="Alamat Lengkap"
                placeholder="Alamat Lengkap"
                value={form.alamat_lengkap}
                handleChangeText={(e) =>
                  setForm({ ...form, alamat_lengkap: e })
                }
                otherStyles="mt-3"
                validationMessage="Mohon isi alamat lengkap"
              />

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

export default Alamat;



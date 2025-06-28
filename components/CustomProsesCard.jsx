import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const config = {
  storageId: "6805fcb3001db0d06f70",
  projectId: "6805f3350031a662e30f",
};

const getImageViewUrl = (bucketId, fileId, projectId) => {
  if (!fileId) return null;
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

const CustomProsesCard = ({ data, containerStyles, handlePress }) => {
  return (
    <View className={`${containerStyles}`}>
      <View className="w-full border border-secondary bg-primary px-4 rounded-lg">
        <Text className="mt-4 font-bold text-xl">{data.status}</Text>

        <View className="items-center justify-center border border-black-100 py-3 mt-3 rounded-lg">
          <Image
            source={{
              uri: getImageViewUrl(
                config.storageId,
                data.imagesampah,
                config.projectId
              ),
            }}
            className="w-16 h-16"
          />
          <Text className="font-bold text-lg">{data.title}</Text>
          <Text>{data.type}</Text>
          <Text>{data.poin}</Text>
        </View>

        <View className="border border-black-100 py-3 mt-3 px-4 gap-3 mb-3 rounded-lg">
          <Text>
            <Text className="font-bold">Total sampah</Text>:{" "}
            {data.total_sampah || "1"} sampah
          </Text>
          <Text>
            <Text className="font-bold">Sampah akan dijemput pada</Text>:{" "}
            {data.tanggalPenjemputan || "Belum ditentukan"}
          </Text>
          <Text>
            <Text className="font-bold">Id Penukaran Sampah</Text>:{" "}
            {data.$id || "Belum ditentukan"}
          </Text>
          <CustomButton
            title="Lihat Rincian"
            handlePress={handlePress}
            containerStyles="w-full h-[40px] self-center rounded-xl"
          />
          <Text>
            <Text className="font-bold">No. Antrean</Text>:{" "}
            {data.nomor_antrean || "Belum ada"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomProsesCard;

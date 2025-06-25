import { View, Text, Image, TouchableOpacity } from "react-native";

const CustomFormCard = ({
  data: {
    $id,
    status,
    jumlah,
    bank,
    users: { nama, accountId },
  },
  handlePress,
  isLoading,
  containerStyles,
}) => {
  return (
    <View className="px-4 mt-5">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={` w-[100%]  rounded-2xl border border-secondary overflow-hidden mt-3 ${
          isLoading ? "opacity-50" : ""
        } ${containerStyles || ""}`}
        disabled={isLoading}
      >
        <View className="p-4">
          <Text className="font-pregular text-2xl">
            Jumlah penukaran: {jumlah}
          </Text>
          <Text>Penyumbang: {nama}</Text>
          <Text>ID Penyetoran: {$id}</Text>
          <Text>Bank: {bank}</Text>
        </View>

        <View className="flex w-[100%] h-[70px] items-end justify-center bg-primary px-4">
          <Text className="font-pregular text-3xl">{status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFormCard;

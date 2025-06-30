import { View, Text, Image, TouchableOpacity } from "react-native";

const CustomkurirCard = ({
  data: {
    $id,
    status,
    type,
    title,
    tanggalPenjemputan,
    users: { nama },
  },
  handlePress,
  isLoading,
  containerStyles,
}) => {
  return (
    <View className="px-4 mt-5">
      <Text>Tanggal penjemputan {tanggalPenjemputan}</Text>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`${
          status === "Menunggu Penjemputan"
            ? "bg-yellow-400"
            : status === "Disetujui"
            ? "bg-secondary"
            : "bg-red-500"
        } w-[100%] rounded-2xl border border-secondary overflow-hidden mt-3  ${
          isLoading ? "opacity-50" : ""
        } ${containerStyles || ""}`}
        disabled={isLoading}
      >
        <View className="p-4">
          <Text className="font-pregular text-2xl">Sampah: {title}</Text>
          <Text>Jenis: {type}</Text>
          <Text>Penyumbang: {nama}</Text>
          <Text>ID Penyetoran: {$id}</Text>
        </View>

        <View className="flex w-[100%] h-[70px] items-end justify-center bg-primary px-4">
          <Text className="font-pregular text-3xl">{status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomkurirCard;

import { View, Text,} from "react-native";
import "../global.css";



const CustomAlamatCard = ({ Tempat, wilayah, Nama, NoHp, Alamat, isSelected }) => {
  return (
    <View className="w-full px-3 justify-center">
      <View
        className={`w-[95%] mt-3 pl-3 rounded-xl p-3 shadow-md ${
          isSelected ? "bg-green-200" : "bg-gray-200"
        }`}
      >
        <Text className="font-bold text-lg">{Tempat}</Text>
        <Text className="text-secondary">{wilayah}</Text>
        <Text className="mt-1">
          {Nama} <Text className="text-gray-500">({NoHp})</Text>
        </Text>
        <Text className="mt-1">{Alamat}</Text>
      </View>
    </View>
  );
};

export default CustomAlamatCard;
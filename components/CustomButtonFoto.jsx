import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
const CustomButtonFoto = ({ onPress, imagePick, placeHolderImage }) => {
  return (
    <View className="items-center">
      <Text className="mt-4 font-bold text-xl mb-3">Foto Sampah</Text>
      <TouchableOpacity onPress={onPress}>
        {imagePick ? (
          <Image
            source={imagePick ? { uri: imagePick.uri } : placeHolderImage}
            className={"w-60 h-60"}
            resizeMode="contain"
          />
        ) : (
          <View className="h-16 w-full mt-3 bg-secondary rounded-xl justify-between items-center flex-row p-4">
            <Image
              source={icons.camera}
              className="w-9 h-9"
              resizeMode="contain"
              style={{ tintColor: "#FFFFFF" }}
            />
            <Text className="text-primary">
              Silahkan masukkan bukti transaksi
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButtonFoto;

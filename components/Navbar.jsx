import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Navbar = ({ title = "Register" }) => {
  const navigation = useNavigation();

  return (
    <View className=" justify-center py-[30px] px-4 bg-primary">
      <View className="flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-black text-[17px] font-bold ml-5">{title}</Text>
      </View>
    </View>
  );
};

export default Navbar;

import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";

const CustomSelectBank = ({
  selectedOption,
  setSelectedOption,
  dropDownList,
}) => {
  return (
    <View>
      <Picker
        itemStyle={{ color: "black" }}
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        {dropDownList.map((item, index) => (
          <Picker.Item
            key={index}
            label={`${item.nama_bank} - ${item.rekening} - ${item.nama}`}
            value={`${item.nama_bank} - ${item.rekening} - ${item.nama}`}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CustomSelectBank;

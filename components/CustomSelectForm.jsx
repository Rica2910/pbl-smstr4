import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";

const CustomSelectForm = ({
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
          <Picker.Item key={index} label={item.value} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default CustomSelectForm;

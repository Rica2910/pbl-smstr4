import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router"; 

const CustomdetailCampaigncard = ({ title }) => {
 

  return (
   
      <View className="items-center justify-center"> 
            <Text>{title}</Text>
      </View>
 
  );
};

export default CustomdetailCampaigncard;

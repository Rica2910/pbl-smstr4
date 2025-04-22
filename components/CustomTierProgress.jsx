import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";

const CustomTierProgress = ({ data }) => {
  const [progress, setProgress] = useState(0);
  const targetProgress = 500;

  useEffect(() => {
    setProgress(data.penukaran / targetProgress);
  }, [data]);

  return (
    <View
      className={`${
        data.tier === "Gold"
          ? "bg-gold"
          : data.tier === "Silver"
          ? "bg-silver"
          : "bg-bronze"
      } h-60 px-4 justify-center`}
    >
      <Text className="font-pmedium text-3xl mb-3">{data.tier}</Text>
      <View className="rounded-xl bg-primary h-30 p-4 w-full">
        <Text className="font-pmedium text-secondary">
          {targetProgress - data.penukaran}{" "}
          <Text className="text-black">Penukaran lagi</Text>
        </Text>
        <View className="flex-row items-center mb-3">
          <ProgressBar progress={progress} width={280} color="#2dcd6e" />
          <View
            className={`rounded-lg ${
              data.tier === "Bronze"
                ? "bg-silver"
                : data.tier === "Silver"
                ? "bg-gold"
                : "bg-gold"
            }  justify-center items-center w-20 h-6 ml-2`}
          >
            <Text className="font-pmedium text-sm">
              {data.tier === "Bronze"
                ? "Silver"
                : data.tier === "Silver"
                ? "Gold"
                : "Gold"}
            </Text>
          </View>
        </View>
        <Text className="font-pmedium text-sm">
          Tukarkan sampah untuk meningkatkan level-mu dan nikmati keutungan yang
          level-mu berikan
        </Text>
      </View>
    </View>
  );
};

export default CustomTierProgress;

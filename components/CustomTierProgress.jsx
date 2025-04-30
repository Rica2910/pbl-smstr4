import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";

const CustomTierProgress = ({ data }) => {
  const [progress, setProgress] = useState(0);
  const targetProgress =
    data.penukaran < 500
      ? 500
      : data.penukaran >= 500 && data.penukaran < 1000
      ? 1000
      : data.penukaran < 1500 && data.penukaran >= 1000
      ? 1500
      : data.penukaran;

  useEffect(() => {
    setProgress(data.penukaran / targetProgress);
  }, [data]);

  return (
    <View
      className={`${
        data.penukaran >= 1500
          ? "bg-black"
          : data.penukaran < 1500 && data.penukaran >= 1000
          ? "bg-gold"
          : data.penukaran < 1000 && data.penukaran >= 500
          ? "bg-silver"
          : "bg-bronze"
      } h-60 px-4 justify-center`}
    >
      <Text
        className={`font-pmedium text-3xl mb-3 ${
          data.penukaran >= 1500 ? "text-white" : ""
        }`}
      >
        {data.penukaran >= 1500
          ? "Black"
          : data.penukaran < 1500 && data.penukaran >= 1000
          ? "Gold"
          : data.penukaran < 1000 && data.penukaran >= 500
          ? "Silver"
          : "Bronze"}
      </Text>
      <View className="rounded-xl bg-primary h-30 p-4 w-full">
        <Text className="font-pmedium text-secondary">
          {targetProgress - data.penukaran}{" "}
          <Text className="text-black">Penukaran lagi</Text>
        </Text>
        <View className="flex-row items-center mb-3">
          <ProgressBar progress={progress} width={150} color="#2dcd6e" />
          <View
            className={`rounded-lg ${
              data.penukaran < 500
                ? "bg-silver"
                : data.penukaran >= 500 && data.penukaran < 1000
                ? "bg-gold"
                : data.penukaran >= 1000 && data.penukaran < 1500
                ? "bg-black"
                : "bg-black"
            }  justify-center items-center w-20 h-6 ml-2`}
          >
            <Text
              className={`font-pmedium text-sm ${
                data.penukaran >= 1000 ? "text-white" : ""
              }`}
            >
              {data.penukaran < 500
                ? "Silver"
                : data.penukaran >= 500 && data.penukaran < 1000
                ? "Gold"
                : data.penukaran >= 1000 && data.penukaran < 1500
                ? "Black"
                : "Black"}
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

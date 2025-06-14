import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { icons } from "../constants";
import CustomButton from "./CustomButton";

const CustomRedeemPointsModal = ({ visible, onClose, userPoints }) => {
  const [selectedPoints, setSelectedPoints] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Debug logging
  console.log("CustomRedeemPointsModal rendered with:", { visible, userPoints });

  // Conversion rate: 1 point = 2 rupiah
  const POINT_TO_RUPIAH_RATE = 2;

  const redeemOptions = [
    { points: 10000, rupiah: 10000 * POINT_TO_RUPIAH_RATE },
    { points: 20000, rupiah: 20000 * POINT_TO_RUPIAH_RATE },
    { points: 30000, rupiah: 30000 * POINT_TO_RUPIAH_RATE },
    { points: 50000, rupiah: 50000 * POINT_TO_RUPIAH_RATE },
    { points: 75000, rupiah: 75000 * POINT_TO_RUPIAH_RATE },
    { points: 100000, rupiah: 100000 * POINT_TO_RUPIAH_RATE },
  ];

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowCustomAlert(true);
  };

  const hideAlert = () => {
    setShowCustomAlert(false);
    setAlertMessage("");
    setAlertTitle("");
  };

  const handleRedeem = async () => {
    console.log("handleRedeem called");
    console.log("selectedPoints:", selectedPoints);
    console.log("userPoints:", userPoints);
    
    // Convert userPoints to number for comparison
    const userPointsNumber = Number(userPoints) || 0;
    
    if (!selectedPoints) {
      console.log("No points selected, showing alert");
      showAlert("Peringatan", "Silakan pilih jumlah poin yang ingin ditukar");
      return;
    }

    if (selectedPoints.points > userPointsNumber) {
      console.log("Insufficient points, showing alert");
      showAlert("Peringatan", "Poin tidak mencukupi untuk penukaran ini");
      return;
    }

    console.log("Starting redemption process...");
    setIsRedeeming(true);
    
    try {
      // Simulate API call for redemption
      console.log("Simulating API call...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("API call completed, showing success alert");
      showAlert(
        "Berhasil!",
        `Penukaran ${selectedPoints.points} poin senilai Rp ${selectedPoints.rupiah.toLocaleString('id-ID')} telah diproses. Dana akan ditransfer dalam 1-3 hari kerja.`
      );
      
      // Reset selection after successful redemption
      setTimeout(() => {
        setSelectedPoints(null);
        hideAlert();
        onClose();
      }, 3000);
      
    } catch (error) {
      console.log("Error during redemption:", error);
      showAlert("Error", "Terjadi kesalahan saat memproses penukaran");
    } finally {
      setIsRedeeming(false);
    }
  };

  const renderRedeemOption = ({ item }) => {
    const isSelected = selectedPoints?.points === item.points;
    // Convert userPoints to number and handle undefined/null values
    const userPointsNumber = Number(userPoints) || 0;
    const isDisabled = item.points > userPointsNumber;

    // Debug logging for each option
    console.log(`Option ${item.points}: userPoints=${userPoints}, userPointsNumber=${userPointsNumber}, isDisabled=${isDisabled}`);

    return (
      <TouchableOpacity
        onPress={() => {
          console.log(`Pressed option ${item.points}, isDisabled: ${isDisabled}`);
          if (!isDisabled) {
            setSelectedPoints(item);
            console.log(`Selected points: ${item.points}`);
          }
        }}
        activeOpacity={0.7}
        className={`p-4 rounded-xl border-2 mb-3 ${
          isSelected
            ? "border-secondary bg-secondary-100"
            : isDisabled
            ? "border-gray-300 bg-gray-100"
            : "border-secondary bg-primary"
        }`}
        disabled={isDisabled}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className={`font-pmedium text-lg ${
              isDisabled ? "text-gray-400" : "text-black"
            }`}>
              {item.points.toLocaleString('id-ID')} Poin
            </Text>
            <Text className={`text-sm ${
              isDisabled ? "text-gray-400" : "text-secondary"
            }`}>
              = Rp {item.rupiah.toLocaleString('id-ID')}
            </Text>
          </View>
          {isSelected && (
            <View className="w-6 h-6 bg-secondary rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center px-4">
        <View className="bg-primary rounded-2xl p-6 w-full max-w-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-pbold text-xl text-black">Tukar Poin</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-2xl">×</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-secondary-100 p-4 rounded-xl mb-4">
            <Text className="font-pmedium text-center text-black">
              Poin Anda: {(Number(userPoints) || 0).toLocaleString('id-ID')} Poin
            </Text>
            <Text className="text-center text-sm text-secondary mt-1">
              1 Poin = Rp 2
            </Text>
          </View>

          <Text className="font-pmedium text-black mb-3">
            Pilih jumlah poin yang ingin ditukar:
          </Text>

          <FlatList
            data={redeemOptions}
            renderItem={renderRedeemOption}
            keyExtractor={(item) => item.points.toString()}
            showsVerticalScrollIndicator={false}
            className="max-h-64"
          />

          <View className="mt-4">
            <TouchableOpacity
              onPress={() => {
                console.log("TouchableOpacity pressed!");
                showAlert("Test", "Exchange button pressed!");
                handleRedeem();
              }}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl justify-center items-center px-4 h-[50px] ${
                isRedeeming ? 'opacity-50' : ''
              }`}
              disabled={isRedeeming}
            >
              <Text className="text-primary font-semibold text-lg">
                {isRedeeming ? "Memproses..." : "Tukar Poin"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} className="mt-3">
            <Text className="text-center text-gray-500 font-pmedium">
              Batal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Alert */}
      {showCustomAlert && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center px-4">
          <View className="bg-primary rounded-2xl p-6 w-full max-w-sm">
            <Text className="font-pbold text-xl text-black mb-3">{alertTitle}</Text>
            <Text className="font-pmedium text-black mb-4">{alertMessage}</Text>
            <TouchableOpacity
              onPress={hideAlert}
              className="bg-secondary rounded-xl justify-center items-center px-4 h-[50px]"
            >
              <Text className="text-primary font-semibold text-lg">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomRedeemPointsModal; 
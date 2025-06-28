import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SetorLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="penyetoran" options={{ headerShown: false }} />
        <Stack.Screen
          name="validasiPenyetoran"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="alamat" options={{ headerShown: false }} />
        <Stack.Screen
          name="validasiPenjemputan"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="detailAlamat" options={{ headerShown: false }} />
        <Stack.Screen
          name="validasiPenukaran"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
};

export default SetorLayout;

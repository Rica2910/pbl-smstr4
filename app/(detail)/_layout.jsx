import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SetorLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="detailcampaign" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
};

export default SetorLayout;

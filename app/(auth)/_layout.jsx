import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown:false }}/>
            <Stack.Screen name="sign-up" options={{ headerShown:false }}/>
        </Stack>

        <StatusBar style='dark' backgroundColor='#fff' />
    </>
  )
}

export default AuthLayout
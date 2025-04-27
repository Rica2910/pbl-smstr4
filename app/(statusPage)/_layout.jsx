import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import "../../global.css";

const TabsIcon = ({  color, focused, name }) => {
  return (
    <View className="flex-1 items-center justify-end w-20 h-full pb-2">
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-lg`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2dcd6e",
          tabBarInactiveBackgroundColor: "#fff",
          tabBarPosition : "top",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderTopColor: "#2dcd6e",
            height: 100,
          },
        }}
      >
        <Tabs.Screen
          name="diproses"
          options={{
            title: "diproses",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabsIcon
                  name={"Proses"}
                  color={color}
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="selesai"
          options={{
            title: "selesai",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabsIcon
                  name={"Selesai"}
                  color={color}
                  focused={focused}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

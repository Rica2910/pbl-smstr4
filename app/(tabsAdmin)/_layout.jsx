import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import "../../global.css";

const TabsIcon = ({ icon, color, focused, name }) => {
  return (
    <View className="items-center justify-center gap-2 w-20 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const AdminTabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2dcd6e",
          tabBarInactiveBackgroundColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#2dcd6e",
            height: 82,
          },
        }}
      >
        <Tabs.Screen
          name="homeAdmin"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabsIcon
                  name={"Home"}
                  color={color}
                  icon={icons.home}
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="tambahAkun"
          options={{
            title: "Tambah Akun",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabsIcon
                  name={"Akun"}
                  color={color}
                  icon={icons.plus}
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: "Profil",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabsIcon
                  name={"Profil"}
                  color={color}
                  icon={icons.profile}
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

export default AdminTabsLayout;

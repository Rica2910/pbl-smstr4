import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import CustomStatusBarCard from "../../components/CustomStatusBarCard";
import "../../global.css";

const TabsIcon = ({ color, focused, name }) => {
  return (
    <View className="flex-1 items-center justify-end w-20 h-full">
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomStatusBarCard {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2dcd6e",
        tabBarInactiveTintColor: "#999",
        tabBarPosition: "top",
      }}
    >
      <Tabs.Screen
        name="menunggu_persetujuan"
        options={{
          title: "Menunggu Persetujuan",
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon name="Menunggu Persetujuan" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="diproses"
        options={{
          title: "diproses",
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon name="diproses" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dijemput"
        options={{
          title: "diJemput",
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon name="Jemput" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="selesai"
        options={{
          title: "selesai",
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon name="selesai" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="batal"
        options={{
          title: "Batal",
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon name="Batal" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

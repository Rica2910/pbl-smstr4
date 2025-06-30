import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomStatusBarCard = ({ state, descriptors, navigation, position }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderBottomWidth: isFocused ? 3 : 0,
                borderBottomColor: "#2dcd6e",
              }}
            >
              <Text
                style={{
                  color: isFocused ? "#2dcd6e" : "#999",
                  fontWeight: isFocused ? "bold" : "normal",
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CustomStatusBarCard;

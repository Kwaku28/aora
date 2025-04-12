import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";

import { icons } from "@/constants/icons";
import { StatusBar } from "expo-status-bar";

const TabsIcon = ({ icon, name, color, focused }: any) => {
  return (
    <View className="items-center justify-center gap-2 mt-4">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="size-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs w-14 text-center`}
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
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
              <TabsIcon
                icon={icons.home}
                name="Home"
                color={color}
                focused={focused}
              /> 
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
              <TabsIcon
                icon={icons.bookmark}
                name="Bookmark"
                color={color}
                focused={focused}
              /> 
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
              <TabsIcon
                icon={icons.plus}
                name="Create"
                color={color}
                focused={focused}
              /> 
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
              <TabsIcon
                icon={icons.profile}
                name="Profile"
                color={color}
                focused={focused}
              /> 
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;

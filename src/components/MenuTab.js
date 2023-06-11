// import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SelectTeacherPage } from "../screen/SelectTeacherPage";
import { TalkPage } from "../screen/TalkPage";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const MenuTab = ({ navigation }) => {
  // デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "lightgray",
        backgroundColor: "#7CA8FE",
        tabBarStyle: { height: 60, backgroundColor: "#7CA8FE" },
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Select teacher"
        component={SelectTeacherPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversation"
        component={TalkPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="chat-processing-outline" size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({});

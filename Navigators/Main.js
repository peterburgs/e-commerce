import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Icons
import Icon from "react-native-vector-icons/FontAwesome";

// Import Components
import HomeNavigator from "./HomeNavigator";

// Create Tab
const Tab = createBottomTabNavigator();

// Define component
const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      {/* // Home Tab  */}
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="home"
                style={{
                  position: "relative",
                }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />
      {/* // Cart Tab */}
      <Tab.Screen
        name="Cart"
        // TODO: Change into Cart
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-cart" color={color} size={30} />;
          },
        }}
      />
      {/* // Admin Tab (only available to admin)*/}
      <Tab.Screen
        name="Admin"
        // TODO: Change into Admin
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="cog" color={color} size={30} />;
          },
        }}
      />

      {/* // User Tab */}
      <Tab.Screen
        name="User"
        // TODO: Change into User
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="user" color={color} size={30} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});

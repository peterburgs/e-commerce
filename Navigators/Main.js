import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Icons
import Icon from "react-native-vector-icons/FontAwesome";

// Import Components
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

// Import Auth Context
import AuthGlobal from "../Context/store/AuthGlobal";

// Import icon
import CartIcon from "../Shared/CartIcon";
import Auth from "../Context/store/Auth";

// Create Tab
const Tab = createBottomTabNavigator();

// Define component
const Main = () => {
  const context = useContext(AuthGlobal);

  // JSX
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
        name="Home"
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
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {/* // Admin Tab (only available to admin)*/}

      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="cog" color={color} size={30} />;
            },
          }}
        />
      ) : null}

      {/* // User Tab */}
      <Tab.Screen
        name="User"
        component={UserNavigator}
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

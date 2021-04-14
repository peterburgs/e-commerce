import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Components
import Cart from "../Screens/Cart/Cart/";
import Checkout from "../Screens/Cart/Checkout";

// Declare Stack
const Stack = createStackNavigator();

// Define CartNavigator component
const CartNavigator = () => {
  return (
    <Stack.Navigator>
      {/*// Stack of Cart */}
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      {/*// Stack of Checkout */}
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;

const styles = StyleSheet.create({});

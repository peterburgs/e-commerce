import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigators
import Main from "./Navigators/Main";

// Import components
import Header from "./Shared/Header";

// Import Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import { createStackNavigator } from "@react-navigation/stack";

// Define main App
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

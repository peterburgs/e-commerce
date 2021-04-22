import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Context API
import Auth from "./Context/store/Auth";

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
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
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

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Checkout = (props) => {
  return (
    <View>
      <Text>Checkout Screen</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Cart")}>
        <Text style={{ color: "blue" }}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({});

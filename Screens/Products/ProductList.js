import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Get device spec
const { width, height } = Dimensions.get("window");

// Import components
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { item } = props;
  return (
    <View>
      <TouchableOpacity style={{ width: "50%" }}>
        <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
          <ProductCard {...item} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});

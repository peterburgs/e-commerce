import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  LogBox,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";

LogBox.ignoreAllLogs();
// Icon
import { Feather } from "@expo/vector-icons";

// Import Components
import ProductList from "./ProductList";

const ProductContainer = () => {
  // Get mockup data
  const data = require("../../assets/data/products.json");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <Container>
      <Header rounded searchBar style={{ flexDirection: "row" }}>
        <Item>
          <Icon name="ios-search" style={{ fontSize: 20, color: "red" }} />

          <Input placeholder="Find a product" />
        </Item>
      </Header>
      <View>
        <View style={{ marginTop: 10, backgroundColor: "gainsboro" }}>
          <Text>Product Container</Text>
          <Feather name="search" size={24} color="red" />
          <FlatList
            data={products}
            renderItem={({ item }) => {
              return <ProductList key={item.id} item={item} />;
            }}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    </Container>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});

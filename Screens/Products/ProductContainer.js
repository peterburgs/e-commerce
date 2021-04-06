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

// Import Components
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";

const ProductContainer = () => {
  // Get mockup data
  const data = require("../../assets/data/products.json");
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  // Function to search product
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  // Function Open List
  const openList = () => {
    setFocus(true);
  };

  // Function Close List
  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Container>
      <Header rounded searchBar style={{ flexDirection: "row" }}>
        <Item>
          <Icon name="ios-search" style={{ fontSize: 20, color: "black" }} />

          <Input
            placeholder="Find a product"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus === true ? <Icon onPress={onBlur} name={"ios-close"} /> : null}
        </Item>
      </Header>

      {focus === true ? (
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <View>
          <View style={{ marginTop: 10, backgroundColor: "gainsboro" }}>
            <Banner />
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
      )}
    </Container>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});

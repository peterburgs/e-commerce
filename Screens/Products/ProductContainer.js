import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  LogBox,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";

LogBox.ignoreAllLogs();
// Import Components
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

// Get mockup data
const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

// Get device spec
const { width, height } = Dimensions.get("window");

// Declare component
const ProductContainer = () => {
  // States
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);

  // Use Effect
  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productCategories);
    setActive(-1);
    setInitialState(data);
    setProductsCtg(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState([]);
      setProductsCtg([]);
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

  // Change Categories changeCtg
  const changeCtg = (ctg) => {
    ctg === "all"
      ? [setProductsCtg(initialState), setActive(true)]
      : [
          setProductsCtg(
            products.filter((i) => {
              return i.category.$oid == ctg.$oid;
            })
          ),
          setActive(true),
        ];
  };

  // JSX Code
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
        <ScrollView style={styles.container}>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return <ProductList key={item.name} item={item} />;
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text style={{ textAlign: "center" }}>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    height: height,
    flex: 1,
  },
  listContainer: {
    width: width,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
LogBox.ignoreAllLogs();
// Import Components
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import { useLinkProps } from "@react-navigation/native";
import axios from "axios";
// URL
import baseURL from "../../assets/common/baseUrl";

// Get mockup data

// Get device spec
const { width, height } = Dimensions.get("window");

// Declare component
const ProductContainer = (props) => {
  // States
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use Effect
  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Get products
      axios
        .get(`${baseURL}/products`)
        .then((res) => {
          setProducts(res.data.products);
          setProductsFiltered(res.data.products);
          setProductsCtg(res.data.products);
          setInitialState(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log("====================================");
          console.log("Cannot get products");
          console.log(err.message);
          console.log("====================================");
        });

      // Get categories
      axios
        .get(`${baseURL}/categories`)
        .then((res) => {
          console.log("====================================");
          console.log(res.data);
          console.log("====================================");
          setCategories(res.data.categories);
        })
        .catch((err) => {
          console.log("====================================");
          console.log("Cannot get categories");
          console.log(err.message);
          console.log("====================================");
        });
      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState([]);
        setProductsCtg([]);
      };
    }, [])
  );

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
              return i.category._id == ctg;
            })
          ),
          setActive(true),
        ];
  };

  // JSX Code
  return (
    <>
      {loading ? (
        // Display activity indicator while loading app
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size={"large"} />
        </Container>
      ) : (
        <Container>
          <Header rounded searchBar style={{ flexDirection: "row" }}>
            <Item>
              <Icon
                name="ios-search"
                style={{ fontSize: 20, color: "black" }}
              />

              <Input
                placeholder="Find a product"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus === true ? (
                <Icon onPress={onBlur} name={"ios-close"} />
              ) : null}
            </Item>
          </Header>

          {focus === true ? (
            <SearchedProducts
              productsFiltered={productsFiltered}
              navigation={props.navigation}
            />
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
                    {productsCtg.map((item, index) => {
                      return (
                        <ProductList
                          key={index}
                          item={item}
                          navigation={props.navigation}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text style={{ textAlign: "center" }}>
                      No products found
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      )}
    </>
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

import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";

import { Header, Item, Input, Icon } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import ListItem from "./ListItem";

// Device spec
const { height, width } = Dimensions.get("window");

// List Header
const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};

// Define component
const Products = (props) => {
  // State
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  // useEffect
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(token)
        .then((token) => {
          setToken(token);
        })
        .catch((err) => {
          console.log(err.message);
        });
      axios
        .get(`${baseURL}/products`)
        .then((res) => {
          setProductList(res.data.products);
          setProductFilter(res.data.products);
          setLoading(false);
        })
        .catch();

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  // Search product
  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  // JSX
  return (
    <View>
      {/*// Search bar */}
      <View>
        <Header rounded searchBar>
          <Item style={{ padding: 5 }}>
            <Icon name="ios-search" style={{ fontSize: 20, color: "black" }} />

            <Input
              placeholder="Find a product"
              // TODO: search on change
              //onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
          </Item>
        </Header>
      </View>
      {/* // Content */}
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          renderItem={({ item, index }) => {
            return (
              <ListItem {...item} navigation={props.navigation} index={index} />
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={ListHeader}
        />
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

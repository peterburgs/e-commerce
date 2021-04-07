import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

// Get device spec
const { width, height } = Dimensions.get("window");

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem key={item._id} avatar>
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({});

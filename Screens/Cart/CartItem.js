import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.quantity);
  return (
    <ListItem style={styles.listItem} key={Math.random() * 1000000} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.image
              ? data.image
              : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
        </Left>
        <Right>
          <Text style={{ color: "green" }}>$ {data.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Button } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

// Redux
import { connect } from "react-redux";

import * as actions from "../../../Redux/Actions/cartActions";
import axios from "axios";
import Toast from "react-native-toast-message";
import baseURL from "../../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Device specs
const { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  // States
  const [token, setToken] = useState();

  const finalOrder = props.route.params;
  // Func ConfirmOrder
  const confirmOrder = () => {
    const order = finalOrder.order.order;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}/orders`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error.message);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
    // Set Timeout
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    });
  };
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => setToken(token));
    return () => {
      setToken();
    };
  }, []);
  // JSX
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            {/* // Address */}
            <View style={{ padding: 8 }}>
              <Text>Address:{finalOrder.order.order.shippingAddress}</Text>
              <Text>City:{finalOrder.order.order.city}</Text>
              <Text>Country:{finalOrder.order.order.country}</Text>
            </View>
            {/* // Items in cart */}
            <Text style={styles.title}>Items:</Text>
            {finalOrder.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.listItem} key={x.product.name} avatar>
                  <Left>
                    <Thumbnail
                      source={{ uri: `${baseURL}` + x.product.image }}
                    />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{x.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>$ {x.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place Order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};
export default connect(null, mapDispatchToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 10,
    alignContent: "center",
    backgroundColor: "#FFFFF0",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 8,
    alignItems: "center",
    flexDirection: "row",
  },
});

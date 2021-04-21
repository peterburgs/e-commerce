import React from "react";
import { StyleSheet, View, Dimensions, ScrollView, Button } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

// Redux
import { connect } from "react-redux";

import * as actions from "../../../Redux/Actions/cartActions";

// Device specs
const { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  // Func ConfirmOrder
  const confirmOrder = () => {
    // Set Timeout
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    });
  };

  const confirm = props.route.params;
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
              <Text>Address:{confirm.order.order.shippingAddress}</Text>
              <Text>City:{confirm.order.order.city}</Text>
              <Text>Country:{confirm.order.order.country}</Text>
            </View>
            {/* // Items in cart */}
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.listItem} key={x.product.name} avatar>
                  <Left>
                    <Thumbnail source={{ uri: x.product.image }} />
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

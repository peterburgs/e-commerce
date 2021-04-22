import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import CartItem from "./CartItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import AuthGlobal from "../../Context/store/AuthGlobal";
// BaseURL
import baseURL from "../../assets/common/baseUrl";
// Get device spec
const { width, height } = Dimensions.get("window");

// JSX
const Cart = (props) => {
  const context = useContext(AuthGlobal);
  // Calculate total price of cart
  let total = 0;
  props.cartItems.forEach((e) => {
    return (total += e.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => {
              return <CartItem item={data} />;
            }}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color="#fff" size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <EasyButton
                danger
                medium
                style={{ color: "red" }}
                onPress={() => props.clearCart()}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Clear Cart
                </Text>
              </EasyButton>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  primary
                  medium
                  onPress={() => props.navigation.navigate("Checkout")}
                >
                  <Text style={{ color: "white" }}>Checkout</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  secondary
                  medium
                  onPress={() => props.navigation.navigate("Login")}
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </EasyButton>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started!</Text>
        </Container>
      )}
    </>
  );
};

// Map State to Props
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

// Map Dispatch to Props
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
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
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "green",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

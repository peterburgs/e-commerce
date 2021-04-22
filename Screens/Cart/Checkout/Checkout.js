import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Button, View, TouchableOpacity } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Import Components
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";

// Mock data
const countries = require("../../../assets/data/countries.json");

// Redux
import { connect } from "react-redux";
import AuthGlobal from "../../../Context/store/AuthGlobal";

const Checkout = (props) => {
  const context = useContext(AuthGlobal);
  // States
  const [orderItems, setOrderItems] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [user, setUser] = useState();
  // UseEffect
  useEffect(() => {
    setOrderItems(props.cartItems);
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user._id);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "",
      });
    }
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateCreated: Date.now(),
      orderItems,
      shippingAddress,
      phone,
      status: "3",
      user,
    };
    props.navigation.navigate("Payment", { order: order });
  };
  // JSX
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        {/* // Phone */}
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        {/* // Address */}
        <Input
          placeholder={"Shipping Address"}
          name={"shippingAddress"}
          value={shippingAddress}
          onChangeText={(text) => setShippingAddress(text)}
        />
        {/* // City */}
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        {/* // Country */}
        <Item picker>
          <Picker
            mode={"dropdown"}
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: undefined }}
            selectedValue={country}
            placeholder={"Select your country"}
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor={"#007aff"}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title={"Confirm"} onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return { cartItems: cartItems };
};

export default connect(mapStateToProps)(Checkout);

const styles = StyleSheet.create({});

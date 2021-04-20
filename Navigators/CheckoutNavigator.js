import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

// Import components
import Checkout from "../Screens/Cart/Checkout/Checkout";
import Payment from "../Screens/Cart/Checkout/Payment";
import Confirm from "../Screens/Cart/Checkout/Confirm";

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
};
const CheckoutNavigator = () => {
  return <MyTabs />;
};

export default CheckoutNavigator;

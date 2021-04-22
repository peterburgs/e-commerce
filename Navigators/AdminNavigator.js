import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import Orders from "../Screens/Admin/Orders";
import Categories from "../Screens/Admin/Categories";
import ProductForm from "../Screens/Admin/ProductForm";
import Products from "../Screens/Admin/Products";

const Stack = createStackNavigator();
const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Products"}
        component={Products}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name={"Categories"}
        component={Categories}
        options={{ title: "Categories" }}
      />
      <Stack.Screen
        name={"Orders"}
        component={Orders}
        options={{ title: "Orders" }}
      />
      <Stack.Screen
        name={"ProductForm"}
        component={ProductForm}
        options={{ title: "ProductForm" }}
      />
    </Stack.Navigator>
  );
};
export default AdminNavigator;

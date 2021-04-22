import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import components
import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";

// Stack
const Stack = createStackNavigator();
const UserNavigator = () => {
  return (
    <Stack.Navigator>
      {/* // Stack of Login */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* // Stack of Register */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      {/* // Stack of Profile */}
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;

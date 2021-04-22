import React, { useState, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
// import AsyncStorage from "@react-native-community/async-storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Auth reducer
import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";

// Define
const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  // Use Effect
  useEffect(() => {
    setShowChild(true);
    const token = AsyncStorage.getItem("token").then((res) => {
      if (res) {
        if (setShowChild) {
          dispatch(setCurrentUser(jwt_decode(res)));
        }
      }
    });

    return () => setShowChild(false);
  }, []);
  if (!showChild) return null;
  else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;

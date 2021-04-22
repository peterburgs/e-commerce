import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";

// Base URL
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

// Login User
export const loginUser = async (user, dispatch) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/login`, user);
    if (data) {
      AsyncStorage.setItem("token", data.token);
      const decoded = jwt_decode(data.token);
      console.log("*** ", decoded);

      dispatch(setCurrentUser(decoded, user));
    } else {
      logoutUser(dispatch);
    }
  } catch (err) {
    console.log(err.message);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Username or password is not correct",
      text2: "Try again!",
    });
    logoutUser(dispatch);
  }
};

// Get user by id
export const getUserProfile = async (id) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (data) {
      console.log(data);
    } else {
    }
  } catch (error) {
    console.log(err.message);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Username or password is not correct",
      text2: "Try again!",
    });
  }
};

// Log user out
export const logoutUser = async (dispatch) => {
  try {
    AsyncStorage.removeItem("token");
    dispatch(setCurrentUser({}));
  } catch (error) {
    console.log(err.message);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Username or password is not correct",
      text2: "Try again!",
    });
  }
};

// Set Current user
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};

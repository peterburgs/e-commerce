import React, { useCallback, useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
// Define component
const UserProfile = (props) => {
  const context = useContext(AuthGlobal);

  // useState
  const [userProfile, setUserProfile] = useState();

  // useEffect
  useEffect(() => {
    if (
      context.stateUser.isAuthenticated == false ||
      context.stateUser.isAuthenticated == null
    ) {
      props.navigation.navigate("Login");
    }
    // Get token
    AsyncStorage.getItem("token").then((token) => {
      axios
        .get(`${baseURL}/users/${context.stateUser.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          return setUserProfile(res.data.user[0]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);
  // JSX
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.firstName : "Guest"}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phoneNumber : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <EasyButton
            danger
            medium
            onPress={() => {
              AsyncStorage.removeItem("token");
              logoutUser(context.dispatch);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
          </EasyButton>
        </View>
      </ScrollView>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

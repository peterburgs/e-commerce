import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../Shared/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Orders = (props) => {
  // State
  const [orderList, setOrderList] = useState();
  const [token, setToken] = useState();
  const getOrders = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${baseURL}/orders`, config)
      .then((res) => {
        setOrderList(res.data.orderList);
      })
      .catch((error) => console.log(error));
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("token")
        .then((token) => getOrders(token))
        .catch((err) => console.log(err.message));
      getOrders();

      return () => {
        setOrderList();
      };
    }, [])
  );

  // JSX
  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});

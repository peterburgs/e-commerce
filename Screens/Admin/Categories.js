import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </EasyButton>
    </View>
  );
};
// Define
const Categories = (props) => {
  // States
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  // Add Category
  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}/categories`, category, config)
      .then((res) => {
        setCategories([...categories, res.data.category]);
        setCategoryName("");
      })
      .catch((err) => console.log(err.message));
  };

  // Delete Category by ID
  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}/categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((c) => c._id !== id);
        setCategories(newCategories);
      })
      .catch((err) => console.log(err.message));
  };

  // useEffect
  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => setToken(token))
      .catch((err) => console.log(err.message));

    // Get categories
    axios
      .get(`${baseURL}/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err.message));

    // Cleanup
    return () => {
      setToken();
      setCategories();
    };
  }, []);

  // JSX
  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} delete={deleteCategory} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <EasyButton medium primary onPress={() => addCategory()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});

export default Categories;

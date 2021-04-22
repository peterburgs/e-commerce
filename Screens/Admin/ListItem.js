import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
  Modal,
} from "react-native";
import { Icon } from "native-base";

// base URL
import baseURL from "../../assets/common/baseUrl";

// Device Specs

const { width, height } = Dimensions.get("window");

const ListItem = (props) => {
  // State
  const [visibility, setVisibility] = useState(false);

  // JSX
  return (
    <View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visibility}
        onRequestClose={() => setVisibility(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setVisibility(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Button
              title={"Edit"}
              onPress={() => [
                props.navigation.navigate("ProductForm"),
                console.log(55),
                setVisibility(false),
              ]}
            />
            <Button title={"Delete"} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: props.index % 2 == 0 ? "#fff" : "gainsboro" },
        ]}
        onPress={() => {
          props.navigation.navigate("Product Detail", { item: props });
        }}
        onLongPress={() => setVisibility(true)}
      >
        <Image
          source={{
            uri: props.image
              ? `${baseURL}${props.image}`
              : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {props.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {props.category.name}
        </Text>
        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 30,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

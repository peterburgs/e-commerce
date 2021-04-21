import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { ListItem, Badge, Text } from "native-base";

// Get device spec
const { width, height } = Dimensions.get("window");

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#f2f2f2", width: width }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "#FFF" }}>All</Text>
          </Badge>
        </TouchableOpacity>

        {props.categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                props.categoryFilter(item._id);
                props.setActive(props.categories.indexOf(item));
              }}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5 },
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={{ color: "#FFF" }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

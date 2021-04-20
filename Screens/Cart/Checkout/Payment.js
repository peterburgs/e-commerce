import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  Text,
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Body,
  Title,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
// Payment methods
const methods = [
  { name: "Cash on delivery", value: 1 },
  { name: "Bank transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

// Payment Cards
const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  // Extract data from props
  const order = props.route.params;

  // State
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  // JSX
  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)} key={item.value}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 3 ? (
          <Picker
            mode={"dropdown"}
            iosIcon={<Icon name={"arrow-down"} />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "#FFF" }}
            headerTitleStyle={{ color: "#FFF" }}
            placeholder={"Select one"}
            selectedValue={card}
            onValueChange={(card) => setCard(card)}
          >
            {paymentCards.map((card, index) => {
              return (
                <Picker.Item
                  key={card.name}
                  value={card.value}
                  label={card.name}
                />
              );
            })}
          </Picker>
        ) : null}
        {/* // Button Confirm */}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({});

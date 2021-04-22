import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Toast from "react-native-toast-message";

// Import components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  //  States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Handle submission
  const handleSubmit = () => {
    const user = {
      email: email,
      rawPassword: password,
      name,
      phoneNumber: phone,
      isAdmin: false,
    };
    // Check empty values
    if (!email.length || !password.length || !name.length || !phone.length) {
      setError("All field must be filled out!");
    } else {
      setError("");
      console.log(email + "|" + password);
    }
    // Send request to create user
    axios
      .post(`${baseURL}/users/signup`, user)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration success",
            text2: "Navigating to Login",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          });
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Registration fail",
          text2: "Please try again",
        });
        setError(err.message);
        console.log("====================================");
        console.log("Cannot register.");
        console.log(err.message);
        console.log("====================================");
      });
  };

  // JSX
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        {/*// Email */}
        <Input
          placeholder={"email"}
          value={email}
          id={"email"}
          name={"email"}
          onChangeText={(text) => setEmail(text)}
        />
        {/* // Password */}
        <Input
          placeholder={"password"}
          value={password}
          id={"password"}
          name={"password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        {/* // Name */}
        <Input
          placeholder={"name"}
          value={name}
          id={"name"}
          name={"name"}
          onChangeText={(text) => setName(text)}
        />
        {/* // Phone */}
        <Input
          placeholder={"phone number"}
          value={phone}
          id={"phone"}
          name={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <View style={styles.buttonGroup}>
          <Button title={"Register"} onPress={handleSubmit} />
        </View>
        {error ? <Error message={error} /> : null}
        <View style={[styles.buttonGroup, { marginTop: 40 }]}>
          <Text style={styles.middleText}>Already had have an account?</Text>
          <Button
            title={"Login"}
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

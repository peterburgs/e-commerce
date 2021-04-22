import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// Import components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

// Define component
const LogIn = (props) => {
  // Context
  const context = useContext(AuthGlobal);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle submission (User Login)
  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    // Check empty values
    if (!email.length || !password.length) {
      setError("Email and password cannot be empty!");
    } else {
      setError("");
      console.log(email + "|" + password);
      loginUser(user, context.dispatch);
    }
  };

  // useEffect
  useEffect(() => {
    // Check if user is authenticated
    if (context.stateUser.isAuthenticated) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  // JSX
  return (
    <FormContainer title={"Log In"}>
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
      <View style={styles.buttonGroup}>
        <EasyButton primary medium onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
      {error ? <Error message={error} /> : null}
      <View style={[styles.buttonGroup, { marginTop: 40 }]}>
        <Text style={styles.middleText}>Haven't had have an account yet?</Text>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

export default LogIn;

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

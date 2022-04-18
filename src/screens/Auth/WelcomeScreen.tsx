import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes } from "../../constant/styles";
import IntlPhoneInput from "react-native-intl-phone-input";
import { useAuth } from "../../context/Auth";

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const onSignInPress = async() => {
    const login_data = {
      email: email,
      password: password
    }
    await auth.signIn(login_data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={["black", "rgba(0,0.10,0,0.80)", "rgba(0,0,0,0.20)"]}
        style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ ...Fonts.white30Bold, marginTop: 100.0 }}>
          Welcome back
        </Text>
        <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}>
          Login in your account
        </Text>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            // opacity: 0.25,
            borderRadius: 25.0,
            marginTop: Sizes.fixPadding * 5.0,
            paddingVertical: Sizes.fixPadding + 3.0,
            paddingHorizontal: 25.0,
          }}
        >
          <TextInput
            placeholder="Email"
            style={{ ...Fonts.white16Regular }}
            placeholderTextColor="white"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            // opacity: 0.25,
            borderRadius: 25.0,
            marginTop: Sizes.fixPadding * 2.0,
            paddingVertical: Sizes.fixPadding + 3.0,
            paddingHorizontal: 25.0,
          }}
        >
          <TextInput
            placeholder="Password"
            style={{ ...Fonts.white16Regular }}
            placeholderTextColor="white"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <Text
          style={{
            ...Fonts.white16Regular,
            textAlign: "center",
            marginTop: Sizes.fixPadding * 2.0,
          }}
        >
          Need an account?
          <Text
            style={{
              ...Fonts.white16Regular,
              color: "#6fedfc",
            }}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
        <Text
          style={{
            ...Fonts.white16Regular,
            textAlign: "center",
            marginTop: Sizes.fixPadding * 2.0,
          }}
        >
          Forgot Password?
          <Text
            style={{
              ...Fonts.white16Regular,
              color: "#6fedfc",
            }}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Reset
          </Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onSignInPress}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
            style={{
              paddingVertical: Sizes.fixPadding + 5.0,
              borderRadius: Sizes.fixPadding * 3.0,
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 3.0,
            }}
          >
            <Text style={{ ...Fonts.white16Regular }}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainerStyle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 9.0,
  },
  faceBookButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    backgroundColor: "#3B5998",
  },
  googleButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 4.0,
    backgroundColor: "white",
  },
});

WelcomeScreen.navigationOption = () => {
  return {
    header: () => null,
  };
};

export default WelcomeScreen;

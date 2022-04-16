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

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  function phoneNumberInput() {
    return (
      <IntlPhoneInput
        onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
        defaultCountry="US"
        containerStyle={styles.phoneNumberContainerStyle}
        placeholder="Phone Number"
        dialCodeTextStyle={{ ...Fonts.white16Regular }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 20.0,
          ...Fonts.white16Regular,
        }}
      />
    );
  }

  function formFieldInput(placeholderText, onChange, value, secText) {
    return (
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
          placeholder={placeholderText}
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          onChange={onChange}
          value={value}
          secureTextEntry={secText}
        />
      </View>
    );
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("BottomTabScreen")}
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
    );
  }

  function signUpText() {
    return (
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
    );
  }

  function forgotPassword() {
    return (
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
    );
  }

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
        {formFieldInput("E-mail")}
        {formFieldInput("Password", null, null, true)}
        {signUpText()}
        {forgotPassword()}
        {loginButton()}
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

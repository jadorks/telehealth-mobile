import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes } from "../../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/Auth";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const auth = useAuth();

  const onSignUpPress = async () => {
    const patient_data = {
      email: userEmail,
      password1: password1,
      password2: password2,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    await auth.signUp(patient_data);
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
        <ScrollView style={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            color="white"
            style={{ marginTop: Sizes.fixPadding * 6.0 }}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{ ...Fonts.white30Bold, marginTop: Sizes.fixPadding * 4.0 }}
          >
            Register
          </Text>
          <Text
            style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}
          >
            Create an account
          </Text>
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
              placeholder="First Name"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
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
              placeholder="Last Name"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              value={lastName}
              onChangeText={(value) => setLastName(value)}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              // opacity: 0.25,
              borderRadius: Sizes.fixPadding + 15.0,
              marginTop: Sizes.fixPadding * 2.0,
              paddingVertical: Sizes.fixPadding + 3.0,
              paddingHorizontal: Sizes.fixPadding + 15.0,
            }}
          >
            <TextInput
              placeholder="Email"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              value={userEmail}
              onChangeText={(value) => setUserEmail(value)}
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
              placeholder="Phone Number"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              // opacity: 0.25,
              borderRadius: Sizes.fixPadding + 15.0,
              marginTop: Sizes.fixPadding * 2.0,
              paddingVertical: Sizes.fixPadding + 3.0,
              paddingHorizontal: Sizes.fixPadding + 15.0,
            }}
          >
            <TextInput
              placeholder="Password"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              secureTextEntry={true}
              value={password1}
              onChangeText={(value) => setPassword1(value)}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              // opacity: 0.25,
              borderRadius: Sizes.fixPadding + 15.0,
              marginTop: Sizes.fixPadding * 2.0,
              paddingVertical: Sizes.fixPadding + 3.0,
              paddingHorizontal: Sizes.fixPadding + 15.0,
            }}
          >
            <TextInput
              placeholder="Confirm Password"
              style={{ ...Fonts.white16Regular }}
              placeholderTextColor="white"
              secureTextEntry={true}
              value={password2}
              onChangeText={(value) => setPassword2(value)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onSignUpPress} //BottomTabScreen
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
                marginTop: Sizes.fixPadding * 5.0,
              }}
            >
              <Text style={{ ...Fonts.white16Regular }}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default RegisterScreen;

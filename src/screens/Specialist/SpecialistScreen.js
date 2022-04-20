import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getDoctors } from "../../api/doctors";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

const SpecialistScreen = ({ navigation }) => {
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    async function loadDoctors() {
      const docs = await getDoctors();
      setDoctorsList(docs);
    }
    loadDoctors();
  }, []);

  function header() {
    return (
      <View style={styles.headerContainerStyle}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.navigate("BottomTabScreen")}
        />
        <Text
          style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding * 2.0 }}
        >
          {type}
        </Text>
      </View>
    );
  }

  function search() {
    return (
      <View style={styles.headerSearchStyle}>
        <Ionicons name="search" size={24} color="gray" />
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={`Search Doctors`}
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          />
        </View>
      </View>
    );
  }

  function doctors() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ justifyContent: "center", marginTop: 15.0 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate("DoctorProfile", {doctorId: item.id})}
          >
            <View style={styles.doctorImageContainerStyle}>
              <Image
                source={require("../../assets/images/placeholder/user.png")}
                resizeMode="contain"
                style={{
                  height: 49,
                  width: 49,
                  borderRadius: 75.0,
                  overflow: "hidden",
                }}
              />
            </View>
            <View>
              <Text
                style={{ ...Fonts.black16Bold }}
              >{`${item?.doctor.first_name} ${item?.doctor.last_name}`}</Text>

              <Text
                style={{
                  ...Fonts.grayRegular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {item?.specialty}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.dividerStyle}></View>
        </View>
      );
    };

    const emptyListComponent = () => {
      return (
        <View style={styles.noActiveDataContainerStyle}>
          <FontAwesome5 name="user-md" size={70} color="gray" />
          <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No Doctors Available
          </Text>
        </View>
      );
    };

    return (
      <FlatList
        data={doctorsList}
        keyExtractor={(item) => `${item?.id}`}
        renderItem={renderItem}
        ListEmptyComponent={emptyListComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="rgba(0,0,0,0)">
      <StatusBar backgroundColor={Colors.primary} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {search()}
        {doctors()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSearchStyle: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
  },
  headerContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 40.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    alignItems: "center",
  },
  doctorImageContainerStyle: {
    height: 50.0,
    width: 50.0,
    borderRadius: 75.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  bookContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  bookVideoConsultButtonStyle: {
    width: width / 2 - 30,
    borderColor: "#FF9B07",
    borderWidth: 1.0,
    backgroundColor: "#FFEDD2",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  bookAppointmentButtonStyle: {
    width: width / 2 - 30,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    backgroundColor: "#E3E6FE",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.8,
    marginTop: Sizes.fixPadding * 1.0,
    marginHorizontal: Sizes.fixPadding * 1.0,
  },
  noActiveDataContainerStyle: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
});

SpecialistScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default SpecialistScreen;

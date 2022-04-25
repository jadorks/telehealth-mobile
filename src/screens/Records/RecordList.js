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
import { getRecords } from "../../api/records";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const { width } = Dimensions.get("screen");

const RecordListScreen = ({ navigation }) => {
  const [recordsList, setRecordsList] = useState([]);
  const { patientInfo } = useAuth();

  useEffect(() => {
    async function loadRecords() {
      const recs = await getRecords(patientInfo?.id);
      setRecordsList(recs);
    }
    loadRecords();
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
            placeholder={`Search Records`}
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
            onPress={() => navigation.navigate("RecordDetail", {recordId: item.id})}
          >
            <View style={[styles.doctorImageContainerStyle, {borderRadius: 0}]}>
              <Image
                source={require("../../assets/images/placeholder/empty-folder.png")}
                resizeMode="contain"
                style={{
                  height: 49,
                  width: 49,
                  overflow: "hidden",
                }}
              />
            </View>
            <View>
              <Text
                style={{ ...Fonts.black16Bold }}
              >{item?.diagnosis}</Text>

              <Text
                style={{
                  ...Fonts.grayRegular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {`Diagnosed by: ${item?.doctor.doctor.first_name} ${item?.doctor.doctor.last_name}`}
              </Text>
              <Text
                style={{
                  ...Fonts.grayRegular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {moment(item?.created_at).format("Do MMM, YYYY [at] h:mm A")}
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
          <FontAwesome5 name="folder" size={70} color="gray" />
          <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No Medical Records
          </Text>
        </View>
      );
    };

    return (
      <FlatList
        data={recordsList}
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
    borderWidth: 0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
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
    paddingTop: Sizes.fixPadding * 10.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
});

RecordListScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default RecordListScreen;

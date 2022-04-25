import React from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";
import moment from "moment";
import { deleteBooking } from "../../api/bookings";

const facilitiesList = [
  {
    id: "1",
    facility: "Parking available",
  },
  {
    id: "2",
    facility: "E-Reports available",
  },
  {
    id: "3",
    facility: "Card accepted",
  },
  {
    id: "4",
    facility: "Prescription pick up available",
  },
  {
    id: "5",
    facility: "Report doorstep drop available",
  },
];

const BookingInformationScreen = ({ route, navigation }) => {
  const image = require("../../assets/images/placeholder/user.png");
  const name = "Peter";
  const address = "Address";

  const booking_id = route.params?.booking?.id;
  const datetime = route.params?.booking?.booking_slot.start_time;
  const doctor = route.params?.booking?.doctor;

  const bookingCancel = async () => {
    const deleted = await deleteBooking(booking_id);
    if(deleted){
      console.log("deleted booking");
      navigation.popToTop();
    }else{
      console.log("failed to delete");
    }
  }

  function labInfo() {
    return (
      <View style={styles.labInfoContainerStyle}>
        <Image
          source={image}
          style={{
            height: 90.0,
            width: 90.0,
            borderRadius: Sizes.fixPadding + 5.0,
          }}
          resizeMode="cover"
        />
        <Text numberOfLines={2} style={{ ...Fonts.black15Bold }}>
          {`${doctor.doctor.first_name} ${doctor.doctor.last_name}`}
        </Text>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          height: 1.0,
          elevation: 2.0,
        }}
      ></View>
    );
  }

  function titleInfo({ title }) {
    return (
      <Text
        style={{
          ...Fonts.primaryColor17Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function addressInfo() {
    return (
      <Text
        numberOfLines={2}
        style={{ ...Fonts.blackBold, ...styles.addressTextStyle }}
      >
        {address}
      </Text>
    );
  }

  function mapInfo() {
    return (
      <View style={styles.mapContainerStyle}>
        <MapView
          style={{ height: 270.0 }}
          initialRegion={{
            latitude: 37.33233141,
            longitude: -122.0312186,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
            pinColor={"red"}
          />
        </MapView>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          ...styles.facilitiesContainerStyle,
          marginTop: item.id == "1" ? Sizes.fixPadding + 5.0 : 0.0,
        }}
      >
        <Feather name="check" size={17} color="black" />
        <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}>
          {item.facility}{" "}
        </Text>
      </View>
    );
  };

  function massageAndCallNowButton() {
    return (
      <View
        style={{
          position: "absolute",
          height: 75.0,
          backgroundColor: "white",
          bottom: 0.0,
          left: 0.0,
          right: 0.0,
          flexDirection: "row",
          flex: 1,
          borderTopColor: Colors.lightGray,
          borderTopWidth: 0.5,
          paddingVertical: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={bookingCancel}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Sizes.fixPadding,
            elevation: 2.0,
            backgroundColor: Colors.danger,
          }}
        >
          <Text style={{ ...Fonts.white20Regular }}>Cancel Consultation</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      {labInfo()}
      {divider()}
      {titleInfo({ title: "Date" })}
      <View
        style={{
          // backgroundColor: "rgba(255,255,255,0.25)",
          // opacity: 0.25,
          borderRadius: 25.0,
          borderColor: "black",
          borderWidth: 1,
          marginTop: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding + 3.0,
          paddingHorizontal: 25.0,
          marginHorizontal: Sizes.fixPadding * 1.5,
        }}
      >
        <TextInput
          style={{ ...Fonts.black16Regular, color: "black" }}
          placeholderTextColor="black"
          editable={false}
          value={moment(datetime).format("MMM Do, YYYY")}
        />
      </View>
      {titleInfo({ title: "Time" })}
      <View
        style={{
          // backgroundColor: "rgba(255,255,255,0.25)",
          // opacity: 0.25,
          borderRadius: 25.0,
          borderColor: "black",
          borderWidth: 1,
          marginTop: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding + 3.0,
          paddingHorizontal: 25.0,
          marginHorizontal: Sizes.fixPadding * 1.5,
        }}
      >
        <TextInput
          style={{ ...Fonts.black16Regular, color: "black" }}
          editable={false}
          value={moment(datetime).format("h:mm A")}
        />
      </View>
      {massageAndCallNowButton()}
    </SafeAreaView>
  );
};

BookingInformationScreen.navigationOptions = {
  title: "Lab tests & health checkup",
  headerTitleStyle: {
    ...Fonts.black20Bold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    elevation: 0,
  },
  ...TransitionPresets.SlideFromRightIOS,
};

const styles = StyleSheet.create({
  labInfoContainerStyle: {
    flexDirection: "column",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  labTimeStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
  addressTextStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  mapContainerStyle: {
    borderRadius: Sizes.fixPadding + 5.0,
    marginTop: 5,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  facilitiesContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
});

export default BookingInformationScreen;

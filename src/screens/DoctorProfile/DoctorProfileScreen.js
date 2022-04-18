import React from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";

const { height } = Dimensions.get("screen");

const userList = [
  {
    id: "1",
    image: require("../../assets/images/user/user_1.jpg"),
    name: "Ersel",
    date: "August 2020",
    review: "Really good doctor.",
  },
  {
    id: "2",
    image: require("../../assets/images/user/user_2.jpg"),
    name: "Jane",
    date: "August 2020",
    review: "Great doctor i have ever seen.",
  },
  {
    id: "3",
    image: require("../../assets/images/user/user_3.jpg"),
    name: "Apollonia",
    date: "July 2020",
    review: "Excellent",
  },
];

const { width } = Dimensions.get("screen");

const DoctorProfileScreen = ({ navigation }) => {
  const name = "Larry Ellison";
  const type = "Psychologist";
  const image = require("../../assets/images/doctor/doctor-1.png");
  const rating = 4.9;
  const experience = 8;

  function backArrow() {
    return (
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
        onPress={() => navigation.goBack()}
      />
    );
  }

  function doctorInfo() {
    return (
      <View>
        <View
          style={{
            alignSelf: "baseline",
            position: "absolute",
            left: 20.0,
            top: width / 3.9,
          }}
        >
          <Text numberOfLines={2} style={{ ...Fonts.white17Bold }}>
            {name}
          </Text>
          <Text
            style={{
              ...Fonts.white16Regular,
              marginVertical: Sizes.fixPadding,
            }}
          >
            {type}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="star" size={20} color="#CDDC39" />
            <Text
              style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}
            >
              {rating} Rating
            </Text>
          </View>
        </View>

        <View style={{ position: "absolute", right: 20.0 }}>
          <Image
            source={image}
            resizeMode="contain"
            style={{ overflow: "hidden", height: 360.0, width: 210 }}
          />
        </View>
      </View>
      // <View style={styles.doctorInfoContainerStyle}>
      // <View style={{
      //     flexDirection: 'row', justifyContent: "space-between", alignItems: 'center',
      //     width: width - 40, alignSelf: 'center', backgroundColor: Colors.lightGray
      // }}>
      //     <View style={{ width: width / 3.0, backgroundColor: 'black' }}>
      //         <Text style={{ ...Fonts.white20Bold }}>{name.substring(3, name.length)}</Text>
      //         <Text style={{ ...Fonts.white16Regular, marginVertical: Sizes.fixPadding }}>{type}</Text>
      //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      //             <FontAwesome name="star" size={20} color="#CDDC39" />
      //             <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}>{rating} Rating</Text>
      //         </View>
      //     </View>
      //     <View>
      //         <Image source={image}
      //             resizeMode="contain"
      //             style={{ overflow: 'hidden', height: 360.0, width: 210 }}
      //         />
      //     </View>
      // </View>
      //  </View >
    );
  }

  function titleInfo({ title }) {
    return (
      <Text style={{ ...Fonts.black18Bold, marginTop: Sizes.fixPadding }}>
        {title}
      </Text>
    );
  }

  function descriptionInfo({ description }) {
    return (
      <Text
        style={{ ...Fonts.gray15Regular, marginVertical: Sizes.fixPadding }}
      >
        {description}
      </Text>
    );
  }

  function mapInfo() {
    return (
      <View
        style={{
          borderRadius: Sizes.fixPadding,
          marginVertical: Sizes.fixPadding,
          overflow: "hidden",
          elevation: 3.0,
        }}
      >
        <MapView
          style={{ height: 250.0 }}
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

  const renderContent = () => (
    <View style={styles.bottomSheetContainerStyle}>
      <View>
        <Text
          style={{ ...Fonts.gray15Regular, marginBottom: Sizes.fixPadding }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
          tincidunt velit. Proin felis leo, porttitor at sollicitudin vel,
          lacinia vel libero. Etiam iaculis dui felis, in faucibus felis varius
          vitae. Nunc a laoreet justo.
        </Text>
        {titleInfo({ title: "Specialty" })}
        {descriptionInfo({ description: `${experience} Years` })}
        {titleInfo({ title: "Availability" })}
        {descriptionInfo({ description: "8:00 AM - 10:30PM" })}
      </View>
      <RNGHTouchableOpacity onPress={() => navigation.push("TimeSlots")}>
        <View
          style={{
            height: 47.0,
            alignItems: "center",
            justifyContent: "center",
            borderColor: Colors.primary,
            borderWidth: 1.0,
            backgroundColor: "white",
            borderRadius: Sizes.fixPadding + 5.0,
          }}
        >
          <Text style={{ ...Fonts.primaryColorBold }}>Book Consultation</Text>
        </View>
      </RNGHTouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#151C48" }}>
      <StatusBar backgroundColor="#151C48" />
      {backArrow()}
      {doctorInfo()}
      <BottomSheet
        snapPoints={[height - 380, height - 150, height - 380]}
        borderRadius={40}
        renderContent={renderContent}
      />
    </View>
  );
};

DoctorProfileScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "#F3F4F9",
  },
  userInfoContainerStyle: {
    borderWidth: 1.0,
    borderColor: Colors.lightGray,
    padding: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding * 2.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 1.0,
    backgroundColor: "white",
    marginBottom: Sizes.fixPadding * 2.0,
  },
  bottomSheetContainerStyle: {
    backgroundColor: "white",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.0,
    height: 800,
  },
  doctorInfoContainerStyle: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
  },
  item: {
    padding: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: Sizes.fixPadding,
  },
});

export default DoctorProfileScreen;

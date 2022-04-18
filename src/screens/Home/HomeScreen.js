import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const specialistsList = [
    {
      id: "1",
      name: "Cough & Fever",
      image: require("../../assets/images/icons/patient.png"),
    },
    {
      id: "2",
      name: "Homoeopath",
      image: require("../../assets/images/icons/stethoscope.png"),
    },
    {
      id: "3",
      name: "Gynecologist",
      image: require("../../assets/images/icons/woman.png"),
    },
    {
      id: "4",
      name: "Pediatrician",
      image: require("../../assets/images/icons/pediatrician.png"),
    },
    {
      id: "5",
      name: "Physiotherapist",
      image: require("../../assets/images/icons/physiotherapist.png"),
    },
    {
      id: "6",
      name: "Nutritionist",
      image: require("../../assets/images/icons/nutritionist.png"),
    },
    {
      id: "7",
      name: "Spine and Pain Specialist",
      image: require("../../assets/images/icons/pain.png"),
    },
  ];

  const labAndCheckUpList = [
    {
      id: "1",
      labName: "New York City DOHMH Public Health Laboratory",
      labAddress: "455 1st Avenue, New York, NY 10016, United States",
      image: require("../../assets/images/lab/lab_1.jpg"),
    },
    {
      id: "2",
      labName: "Enzo Clinical Labs-Upper East Side (STAT Lab)",
      labAddress: "44 E 67th St, New York, NY 10022, United States",
      image: require("../../assets/images/lab/lab_2.jpg"),
    },
    {
      id: "3",
      labName: "New York Startup Lab LLC",
      labAddress: "244 5th Ave #2575, New York, NY 10001, United States",
      image: require("../../assets/images/lab/lab_3.jpg"),
    },
    {
      id: "4",
      labName: "MEDTRICS LAB LLC",
      labAddress: "138 W 25th St 10th floor, New York, NY 10001, United States",
      image: require("../../assets/images/lab/lab_4.jpg"),
    },
    {
      id: "5",
      labName: "Enzo Clinical Labs",
      labAddress: "15005 21st Ave ,Flushing, NY 11357, United States",
      image: require("../../assets/images/lab/lab_5.jpg"),
    },
    {
      id: "6",
      labName: "Shiel Medical",
      labAddress: "128 Mott St,New York, NY 10013,United States",
      image: require("../../assets/images/lab/lab_6.jpg"),
    },
  ];

  function search() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <View style={styles.searchStyle}>
          <Ionicons name="search" size={24} color="gray" />
          <Text
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          >
            What type of appointment?
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function newlyLanched() {
    return (
      <ImageBackground
        source={require("../../assets/images/banner.jpg")}
        resizeMode="contain"
        style={{
          height: 100.0,
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></ImageBackground>
    );
  }

  function title({ title }) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
                style={{
                ...Fonts.black18Bold,
                marginVertical: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                ...Fonts.blackBold,
                marginVertical: Sizes.fixPadding * 1.3,
                marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                View All
            </Text>
        </View>

    );
  }

  function specialists() {
    const renderItem = ({ item }) => (
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text
            style={{
              ...Fonts.black15Bold,
              marginTop: Sizes.fixPadding,
              marginHorizontal: Sizes.fixPadding,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={specialistsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
      />
    );
  }

  function circleSymptomChecker() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 3.0,
        }}
      >
        <TouchableOpacity style={[styles.circleContainer, styles.boxShadow]} onPress={() => console.log('pressed')}>
            <Image source={require('../../assets/images/symptom_checker/symp1.png')} style={{width:'40%', height: '40%', justifyContent: 'center', alignItems: 'center'}}/>
            <Text style={{ ...Fonts.black18Regular }}>Symptom</Text>
            <Text style={{ ...Fonts.black18Regular }}>Checker</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function symptomChecker() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => console.log("pressed")}
        style={styles.labAndCheckUpContainer}
      >
        <Image
          source={"../../assets/images/icons/pediatrician.png"}
          style={{
            height: 199.0,
            width: width - 230.0,
            borderTopLeftRadius: Sizes.fixPadding + 5.0,
            borderBottomLeftRadius: Sizes.fixPadding + 5.0,
            overflow: "hidden",
          }}
          resizeMode="cover"
        />
        <View style={styles.labInformationContainer}>
          <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            Don't feel too good?
          </Text>
          <Text
            numberOfLines={2}
            style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
          >
            Let's check your symptoms
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: Sizes.fixPadding + 10.0,
          }}
        >
          <Ionicons name="chevron-forward" size={25} color="black" />
        </View>
      </TouchableOpacity>
    );
  }

  function viewAll() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ViewAll")}>
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              ...Fonts.primaryColor17Bold,
              marginRight: Sizes.fixPadding - 5.0,
            }}
          >
            View All
          </Text>
          <Ionicons name="chevron-forward" size={23} color="black" />
        </View>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("LabTestAndCheckUp", {
          image: item.image,
          name: item.labName,
          address: item.labAddress,
        })
      }
      style={styles.labAndCheckUpContainer}
    >
      <Image
        source={item.image}
        style={{
          height: 199.0,
          width: width - 230.0,
          borderTopLeftRadius: Sizes.fixPadding + 5.0,
          borderBottomLeftRadius: Sizes.fixPadding + 5.0,
          overflow: "hidden",
        }}
        resizeMode="cover"
      />
      <View style={styles.labInformationContainer}>
        <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
          Dr Brown
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          15th May, 2022
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          08:30
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: Sizes.fixPadding + 10.0,
        }}
      >
        <Ionicons name="chevron-forward" size={25} color="black" />
      </View>
    </TouchableOpacity>
  );

  function header() {
    const refRBSheet = useRef();
    const [city, setCity] = useState("Wallington");
    const cityList = ["Wallingtone", "Central Park", "Nerobi"];

    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={200}
            openDuration={250}
            customStyles={{
              container: {
                paddingHorizontal: Sizes.fixPadding * 2.0,
              },
            }}
          >
            <View>
              <Text style={{ ...Fonts.black20Bold, alignSelf: "center" }}>
                Choose City
              </Text>
              {cityList.map((city) => (
                <TouchableOpacity
                  key={city}
                  onPress={() => {
                    setCity(city);
                    refRBSheet.current.close();
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.black16Regular,
                      marginVertical: Sizes.fixPadding,
                    }}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </RBSheet>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ ...Fonts.black18Regular, marginLeft: 0 }}>
              Welcome, {city}
            </Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          name="notifications"
          size={24}
          color="black"
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      {header()}
      {circleSymptomChecker()}
      {title({ title: "Upcoming Consultations" })}
      <FlatList
        ListHeaderComponent={<></>}
        data={labAndCheckUpList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25.0,
    marginHorizontal: 20.0,
  },
  searchStyle: {
    height: 60.0,
    backgroundColor: "white",
    borderWidth: 1.0,
    borderColor: Colors.lightGray,
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 3.0,
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding + 10.0,
    marginTop: 20.0,
    marginHorizontal: 20.0,
  },
  viewAllStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  callNowButtonStyle: {
    width: 80.0,
    height: 40.0,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10.0,
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    height: 110.0,
    width: width - 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4.0,
    marginBottom: 20.0,
    overflow: "hidden",
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  specialistInfoContainer: {
    height: 160.0,
    width: 200.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: 10.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5.0,
  },
  circleContainer: {

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  }
});

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    elevation,
    shadowColorAndroid,
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: {width: xOffset, height: yOffset},
        shadowOpacity,
      };
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  };

  generateBoxShadowStyle(0,0,'#acacac', 1,20, '#acacac' )

export default HomeScreen;

import React, { useState } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Fonts, Colors, Sizes } from "../constant/styles";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

// const PastAppointmentScreen = () => {
//     const renderItem = ({ item }) => (
//         <View style={{ marginHorizontal: 20.0 }}>
//             <View style={{ flexDirection: 'row', marginVertical: 20.0 }}>
//                 <View style={styles.pasetCircleStyle}>
//                     <Text style={{ textAlign: 'center', color: Colors.primary, fontSize: 18, }}>{item.date}</Text>
//                 </View>
//                 <View style={{ marginLeft: 10.0 }}>
//                     <Text style={{ ...Fonts.black18Bold }}>{item.time}</Text>
//                     <Text style={{ marginVertical: 8.0, ...Fonts.black16Regular }}>{item.doctor}</Text>
//                     <Text style={{ ...Fonts.primaryColorRegular }}>{item.type}</Text>
//                 </View>
//             </View>
//             <View style={{ backgroundColor: Colors.lightGray, height: 0.50, }}>
//             </View>
//         </View>
//     )

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <FlatList
//                 data={pastDataList}
//                 keyExtractor={(item) => `${item.id}`}
//                 renderItem={renderItem}
//             />
//         </View>
//     )

// }

const { width } = Dimensions.get("screen");

export default TabBarScreen = (bookings) => {
  const navigation = useNavigation();

  const [activeDataList, setActiveDataList] = React.useState([
    {
      id: "1",
      date: "15 Oct 2020",
      time: "10:00 AM",
      doctor: "Dr.Ronan Peiterson",
      type: "General Physician",
    },
    {
      id: "2",
      date: "18 Oct 2020",
      time: "12:30 PM",
      doctor: "Dr.Brayden Trump",
      type: "Cardiologist",
    },
    {
      id: "3",
      date: "22 Oct 2020",
      time: "6:00 AM",
      doctor: "Dr.Apollonia Ellison",
      type: "Dentist",
    },
  ]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Past" },
  ]);

  const [showModal, setShowModal] = React.useState(false);

  const [id, setId] = useState("");

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return <ActiveAppointmentScreen jumpTo={jumpTo} />;
      case "second":
        return <PastAppointmentScreen jumpTo={jumpTo} />;
    }
  };

  const removeActive = (id) => {
    let filterArray = activeDataList.filter((val, i) => {
      if (val.id !== id) {
        return val;
      }
    });
    setActiveDataList(filterArray);
  };

  const showDialog = () => {
    return (
      <Dialog.Container
        visible={showModal}
        contentStyle={styles.dialogContainerStyle}
      >
        <View style={styles.dialogStyle}>
          <Text style={{ textAlign: "center", ...Fonts.black16Regular }}>
            Are you sure you want to cancel this appointment?
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowModal(false);
              }}
              style={styles.dialogNoButtonStyle}
            >
              <Text style={{ ...Fonts.primaryColor17Bold }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowModal(false);
                removeActive(id);
              }}
              style={styles.dialogYesButtonStyle}
            >
              <Text style={{ ...Fonts.white17Bold }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  };

  const ActiveAppointmentScreen = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookingInformation", { booking: item })
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.activeCircleStyle}>
              <Text
                style={{ textAlign: "center", color: "#8ECC90", fontSize: 18 }}
              >
                {moment(item.booking_slot.start_time).format("MMM Do, YYYY")}
              </Text>
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.black18Bold }}>
                {moment(item.booking_slot.start_time).format("H:mm A")}
              </Text>
              <Text
                style={{ marginVertical: 8.0, ...Fonts.black16Regular }}
              >{`${item.doctor.doctor.first_name} ${item.doctor.doctor.last_name}`}</Text>
              <Text style={{ ...Fonts.primaryColorRegular }}>
                {item.doctor.specialty}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
        {showDialog()}
      </TouchableOpacity>
    );

    return bookings.bookings.length === 0 ? (
      <View style={styles.noActiveDataContainerStyle}>
        <FontAwesome5 name="calendar-alt" size={70} color="gray" />
        <Text
          style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding * 2.0 }}
        >
          No Active Appointments
        </Text>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <FlatList
          data={bookings.bookings}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
        />
      </View>
    );
  };
  const PastAppointmentScreen = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.pasetCircleStyle}>
              <Text
                style={{ textAlign: "center", color: "#8ECC90", fontSize: 18 }}
              >
                {moment(item.booking_slot.start_time).format("MMM Do, YYYY")}
              </Text>
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.black18Bold }}>
                {moment(item.booking_slot.start_time).format("H:mm A")}
              </Text>
              <Text
                style={{ marginVertical: 8.0, ...Fonts.black16Regular }}
              >{`${item.doctor.doctor.first_name} ${item.doctor.doctor.last_name}`}</Text>
              <Text style={{ ...Fonts.primaryColorRegular }}>
                {item.doctor.specialty}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
        {showDialog()}
      </TouchableOpacity>
    );

    return bookings.pastBookings?.length === 0 ? (
      <View style={styles.noActiveDataContainerStyle}>
        <FontAwesome5 name="calendar-alt" size={70} color="gray" />
        <Text
          style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding * 2.0 }}
        >
          No Past Appointments
        </Text>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <FlatList
          data={bookings?.pastBookings}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
        />
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#2497F3" }}
          tabStyle={{ width: layout.width / 2 }}
          scrollEnabled={true}
          style={{ backgroundColor: "white" }}
          renderLabel={({ route, focused, color }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ ...Fonts.blackRegular, marginRight: 5.0 }}>
                {route.title}
              </Text>
              <View
                style={{
                  width: 24.0,
                  height: 24.0,
                  borderRadius: 12.5,
                  backgroundColor: Colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {route.title == "Active" ? (
                  <Text style={{ ...Fonts.whiteRegular }}>
                    {bookings.bookings.length}
                  </Text>
                ) : (
                  <Text style={{ ...Fonts.whiteRegular }}>
                    {bookings.pastBookings?.length}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  pasetCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#E9EBFE",
    borderColor: Colors.primary,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  activeCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#E8F5E9",
    borderColor: "#8ECC90",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  cancellCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#FFEBEE",
    borderColor: "#F88C85",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  noActiveDataContainerStyle: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogStyle: {
    height: 110.0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogNoButtonStyle: {
    flex: 0.5,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    borderRadius: 8.0,
    marginRight: 15.0,
  },
  dialogYesButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    borderRadius: 8.0,
    marginLeft: 15.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
});

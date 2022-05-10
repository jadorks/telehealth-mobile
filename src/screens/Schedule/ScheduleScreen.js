import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Fonts, Sizes } from "../../constant/styles";
import TabBarScreen from "../../components/TabBarScreen";
import { useFocusEffect } from "@react-navigation/native";
import { getBookings } from "../../api/bookings";
import { useAuth } from "../../context/Auth";

const ScheduleScreen = () => {
  const { patientInfo } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function loadAppointments() {
        const _bookings = await getBookings(patientInfo?.id, "PE");
        const _pastBookings = await getBookings(patientInfo?.id, "CO");
        setBookings(_bookings);
        setPastBookings(_pastBookings);
      }
      loadAppointments();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 55.0, justifyContent: "center" }}>
        <Text
          style={{
            ...Fonts.black20Bold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          Appointments
        </Text>
      </View>
      <TabBarScreen bookings={bookings} pastBookings={pastBookings} />
    </SafeAreaView>
  );
};

ScheduleScreen.navigationOptions = {
  title: "Appointments",
  headerTitleStyle: {
    ...Fonts.white20Bold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
  },
};

export default ScheduleScreen;

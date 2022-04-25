import React, {useEffect, useState} from "react";
import CalendarStrip from 'react-native-calendar-strip';
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList, StyleSheet, Dimensions, Alert } from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { getDoctor } from "../../api/doctors";
import { createBooking, getSlots } from "../../api/bookings";
import moment from "moment";
import { useAuth } from "../../context/Auth";


const { width } = Dimensions.get('screen');

const TimeSlotScreen = ({ route, navigation }) => {

    const image = require("../../assets/images/placeholder/user.png");

    const [appointmentSlots, setAppointmentSlots] = useState([]);

    const [selectedSlot, setSelectedSlot] = React.useState();

    const [doctor, setDoctor] = useState({
        id: '',
        bio: '',
        doctor: {
          first_name: '',
          last_name: ''
        },
        specialty: ''
      });

    const [book, setBook] = React.useState(false);

    const { patientInfo } = useAuth();

    const today = new Date();
    var gte = today.setHours(0,0,0);
    var lte = today.setHours(23,59,59);

    useEffect(() => {
        async function loadPageInfo(){
          if(route.params?.doctorId){
            const doc = await getDoctor(route.params?.doctorId);
            const slots = await getSlots(new Date(gte), new Date(lte), route.params?.doctorId);
            setDoctor(doc);
            setAppointmentSlots(slots);
          }
          else{
            navigation.navigate('BottomTabScreen');
          }
        }
    
        loadPageInfo();
      }, [])

    const addBooking = async () => {
        console.log(patientInfo)
        const booking_info = {
            description: "",
            patient: patientInfo?.id,
            doctor: doctor.id,
            booking_slot: selectedSlot.id
        }
        const bookingCreated = await createBooking(booking_info);
        if(bookingCreated){
            console.log("Added booking successfully");
            navigation.popToTop();
        }else{
            console.log("Booking failed to add");
        }

    }

    function doctorInfo() {

        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <View style={styles.doctorImageContainerStyle}>
                    <Image
                        source={image}
                        resizeMode="contain"
                        style={{
                            height: 90.0, width: 90.0, borderRadius: 45.0,
                        }}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginTop: Sizes.fixPadding, }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        width: width - 140.0,
                    }}>
                        <View style={{ width: width / 3.0, }}>
                            <Text style={{ ...Fonts.black16Bold, }}>{`${doctor?.doctor?.first_name} ${doctor?.doctor?.last_name}`}</Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding - 7.0 }}>{doctor?.specialty}</Text>
                </View>
            </View>
        )
    }

    const confirmBookingAlert = () => {
        return(
            Alert.alert(
                "Booking Confirmation",
                `Do you want to book a consultation with ${doctor.doctor?.first_name} ${doctor.doctor?.last_name} for ${moment(new Date(selectedSlot.start_time)).format("DD/MM/YYYY [at] h:mm A")}?`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Confirm",
                        onPress: () => addBooking()
                    }
                ]
            )
        );
    }

    function slotsInfo({ image, data }) {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Sizes.fixPadding * 2.0,
        }}>
            <Image source={image}
                style={{ height: 40.0, width: 40.0 }}
                resizeMode="contain"
            />
            <Text style={{ ...Fonts.black18Bold, marginLeft: Sizes.fixPadding }}>{data.length} Slots</Text>
        </View>
    }

    function slotsTime({ slots, time }) {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity onPress={() => {
                    setSelectedSlot(`${item} ${time}`)
                    setBook(true)
                }}>
                    <View style={{
                        backgroundColor: selectedSlot == `${item} ${time}` ? Colors.primary : 'white',
                        borderColor: selectedSlot == `${item} ${time}` ? Colors.primary : '#CDCDCD',
                        ...styles.slotContainerStyle,
                    }}>
                        <Text style={
                            (selectedSlot == `${item} ${time}`) ?
                                { ...Fonts.white16Regular }
                                :
                                { ...Fonts.primaryColor16Regular }
                        }>
                            {item}
                        </Text>
                    </View>
                </TouchableOpacity >
            )
        }

        return (
            <View>
                <FlatList
                    data={slots}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedSlot(item)
                setBook(true)
            }} >
                <View style={{
                    backgroundColor: selectedSlot == item ? Colors.primary : 'white',
                    borderColor: selectedSlot == item ? Colors.primary : '#CDCDCD',
                    ...styles.slotContainerStyle,
                }}>
                    <Text style={
                        (selectedSlot == item) ?
                            { ...Fonts.white16Regular }
                            :
                            { ...Fonts.primaryColor16Regular }}
                    > {moment(new Date(item.start_time)).format("h:mm A")} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function bookingInfo() {
        return (
            book ?
                <View style={styles.bookNowContainerStyle}>
                    <TouchableOpacity onPress={confirmBookingAlert}>
                        <View style={styles.bookButtonStyle}>
                            <Text style={{ ...Fonts.white20Regular }}>Book now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                : null
        )
    }

    const datesBlacklistFunc = date => {
        return date.isoWeekday() === 7 || date.isoWeekday() === 6;
    }

    function calander() {
        return (
            <View>
                <View style={{}}>
                    <CalendarStrip
                        style={{ height: 100, paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding, }}
                        highlightDateContainerStyle={{
                            backgroundColor: Colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        dateNumberStyle={{ color: 'black', fontSize: 17.0 }}
                        dateNameStyle={{ color: 'black', fontSize: 15.0 }}
                        highlightDateNameStyle={{ color: 'white', fontSize: 15.0 }}
                        highlightDateNumberStyle={{ color: 'white', fontSize: 17.0 }}
                        disabledDateOpacity={0.6}
                        disabledDateNameStyle={{ color: 'gray', fontSize: 15.0 }}
                        disabledDateNumberStyle={{ color: 'gray', fontSize: 17.0, }}
                        useIsoWeekday={false}
                        scrollable={true}
                        upperCaseDays={false}
                        styleWeekend={true}
                        onDateSelected={async (date) => await getTimeSlots(date)}
                        minDate={moment()}
                        selectedDate={moment()}
                        scrollToOnSetSelectedDate={true}
                    />
                </View>
            </View>
        );
    }

    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }

    async function getTimeSlots(date){
        var selectedDate = new Date(date.toString());
        var gte = selectedDate.setHours(0,0,0);
        var lte = selectedDate.setHours(23,59,59);
        const slots = await getSlots(new Date(gte), new Date(lte), route.params?.doctorId);
        setAppointmentSlots(slots);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={Colors.primary} />
            {

                <View style={{ flex: 1 }}>
                    {doctorInfo()}
                    {calander()}
                    {divider()}
                    <FlatList
                        data={appointmentSlots}
                        renderItem={renderItem}
                        keyExtractor={(index) => `${index}`}
                        numColumns={3}
                        contentContainerStyle={{
                            paddingHorizontal: Sizes.fixPadding,
                            paddingBottom: book ? Sizes.fixPadding * 8.0 : Sizes.fixPadding * 2.0
                        }}
                    />
                    {bookingInfo()}
                </View>
            }

        </View>)
}

TimeSlotScreen.navigationOptions = {
    title: 'Time Slots',
    headerTitleStyle: { ...Fonts.black20Bold, marginLeft: -Sizes.fixPadding * 2.0 },
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    }
}

const styles = StyleSheet.create({
    doctorImageContainerStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: 'white',
        borderColor: '#B3BCFC',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: 'hidden',
    },
    slotContainerStyle: {
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding * 2.0,
        height: 45.0,
        width: 100.0,
    },
    bookButtonStyle: {
        backgroundColor: Colors.primary,
        paddingVertical: Sizes.fixPadding + 3.0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
    },
    bookNowContainerStyle: {
        backgroundColor: 'white',
        height: 75.0,
        position: 'absolute', bottom: 0.0, width: '100%',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.90,
        width: '100%',
        marginBottom: Sizes.fixPadding * 2.0
    }
})

export default TimeSlotScreen;
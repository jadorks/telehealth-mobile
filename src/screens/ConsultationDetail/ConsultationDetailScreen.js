import React from "react";
import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import moment from "moment";


const { width } = Dimensions.get('screen');

const ConsultaionScreen = ({ route, navigation }) => {

    const image = require("../../assets/images/doctor/doctor-1.png");
    const doctor = route.params?.doctor;
    const slot = route.params?.slot;

    console.log(doctor);
    console.log(slot);

    const patientLit = [
        {
            id: '1',
            name: 'Allison Perry',
            image: require('../../assets/images/user/user_3.jpg')
        },
        {
            id: '2',
            name: 'John Smith',
            image: null,
        }
    ];

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
                            overflow: 'hidden',
                        }}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginTop: Sizes.fixPadding, }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        width: width - 140.0,
                    }}>
                        <View style={{ width: width / 3.0, }}>
                            <Text style={{ ...Fonts.black16Bold, }}>{`${doctor.doctor.first_name} ${doctor.doctor.last_name}`}</Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding - 7.0 }}>{doctor.specialty}</Text>
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGray, height: 0.70 }}></View>
        )
    }

    function dateAndTime() {
        return (
            <View style={styles.dateAndTimeContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome5 name="calendar-alt" size={16} color="gray" />
                    <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding + 5.0 }}>{moment(slot.start_time).format("YYYY-MM-DD")}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="access-time" size={18} color="gray" />
                    <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>{moment(slot.start_time).format("h:mm A")}</Text>
                </View>
            </View>
        )
    }

    function appintmentText() {
        return (
            <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
                Appointment for?
            </Text>
        )
    }

    function patients() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <View style={styles.patientImageContainer}>
                        {
                            item.image === null
                                ?
                                <Ionicons name="person" size={24} color="gray" />
                                :
                                <Image
                                    source={item.image}
                                    resizeMode="contain"
                                    style={{ height: 80.0, width: 80.0, borderRadius: 40.0, }}
                                />
                        }
                    </View>
                    <Text style={{ ...Fonts.black16Bold, marginLeft: Sizes.fixPadding, marginBottom: Sizes.fixPadding }}>{item.name}</Text>
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={patientLit}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                />
            </View>
        );
    }

    function confirmPayButton() {
        return (
            <TouchableOpacity
                style={styles.confirmAndPayButtonStyle}
                onPress={() => navigation.navigate('PaymentMethod')}>
                <View style={styles.confirmButtonStyle}>
                    <Text style={{ ...Fonts.white20Regular }}>Confirm &  Pay</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function addPatient() {
        return (
            <View style={styles.addPatientContainerStyle}>
                <MaterialIcons name="add" size={24} color={Colors.primary} />
                <Text style={{ ...Fonts.primaryColor17Bold, marginLeft: Sizes.fixPadding }}>Add Patient</Text>
            </View>
        )
    }

    return <View style={{ flex: 1, backgroundColor: "white" }}>
        {doctorInfo()}
        {divider()}
        {dateAndTime()}
        {divider()}
        {/* {appintmentText()} */}
        {/* {patients()} */}
        {/* {addPatient()} */}
        {confirmPayButton()}
    </View>
}

ConsultaionScreen.navigationOptions = {
    title: 'Consultaion Detail',
    headerTitleStyle: { ...Fonts.black20Bold, marginLeft: -Sizes.fixPadding * 2.0 },
    headerStyle: {
        elevation: 0,
    },
    ...TransitionPresets.SlideFromRightIOS,
}

const styles = StyleSheet.create({
    confirmAndPayButtonStyle: {
        position: 'absolute',
        left: Sizes.fixPadding * 2.0,
        right: Sizes.fixPadding * 2.0,
        bottom: Sizes.fixPadding,
    },
    dateAndTimeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: Sizes.fixPadding
    },
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
    doctorInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    patientImageContainer: {
        height: 80.0,
        width: 80.0,
        borderRadius: 40.0,
        backgroundColor: '#F5F5F5',
        borderColor: Colors.lightGray,
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.lightGray,
        shadowOffset: { width: 0, height: 0 }, // change this for more shadow
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        overflow: 'hidden',
    },
    confirmButtonStyle: {
        backgroundColor: Colors.primary,
        borderRadius: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    addPatientContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
    }
})

export default ConsultaionScreen;
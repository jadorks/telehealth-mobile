import React from "react";
import { Text, View, StyleSheet, TextInput, Image, FlatList, StatusBar, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const SpecialistScreen = ({ navigation }) => {

    const type = 'Doc';

    const doctorsList = [
        {
            id: '1',
            name: 'Dr.Ronan Peiterson',
            yearsOfExperience: 8,
            rating: 4.9,
            reviews: 135,
            image: require('../../assets/images/doctor/doctor-1.png')
        },
        {
            id: '2',
            name: 'Dr.Brayden Trump',
            yearsOfExperience: 10,
            rating: 4.7,
            reviews: 235,
            image: require('../../assets/images/doctor/doctor-2.png')
        },
        {
            id: '3',
            name: 'Dr.Appollonia Ellison',
            yearsOfExperience: 7,
            rating: 4.8,
            reviews: 70,
            image: require('../../assets/images/doctor/doctor-3.png')
        },
        {
            id: '4',
            name: 'Dr.Beatriz Watson',
            yearsOfExperience: 5,
            rating: 5.0,
            reviews: 50,
            image: require('../../assets/images/doctor/doctor-4.png')
        },
        {
            id: '5',
            name: 'Dr.Diego Williams',
            yearsOfExperience: 15,
            rating: 4.9,
            reviews: 512,
            image: require('../../assets/images/doctor/doctor-5.png')
        },
        {
            id: '6',
            name: 'Dr.Shira Gates',
            yearsOfExperience: 4,
            rating: 4.4,
            reviews: 15,
            image: require('../../assets/images/doctor/doctor-6.png')
        },
        {
            id: '7',
            name: 'Dr.Antonia Warner',
            yearsOfExperience: 7,
            rating: 4.6,
            reviews: 99,
            image: require('../../assets/images/doctor/doctor-7.png')
        },
        {
            id: '8',
            name: 'Dr.Linnea Bezos',
            yearsOfExperience: 2,
            rating: 4.5,
            reviews: 9,
            image: require('../../assets/images/doctor/doctor-8.png')
        },
    ];

    function header() {
        return <View style={styles.headerContainerStyle}>
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('BottomTabScreen')} />
            <Text style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding * 2.0 }}>{type}</Text>
        </View>
    }


    function search() {
        return (
            <View style={styles.headerSearchStyle}>
                <Ionicons name="search" size={24} color="gray" />
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder={`Search Doctors`}
                        style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding, }}
                    />
                </View>
            </View>
        )
    }

    function doctors() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ justifyContent: 'center', marginTop: 15.0, }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.navigate("DoctorProfile")}>
                        <View style={styles.doctorImageContainerStyle}>
                            <Image
                                source={item.image}
                                resizeMode="contain"
                                style={{
                                    height: 49, width: 49, borderRadius: 75.0,
                                    overflow: 'hidden',
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black16Bold }}>{item.name}</Text>

                            <Text style={{ ...Fonts.grayRegular, marginTop: Sizes.fixPadding - 7.0 }}>{type}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 7.0 }}>
                                <FontAwesome name="star" size={20} color="#CDDC39" />
                                <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding, marginRight: Sizes.fixPadding * 2.0 }}>
                                    {item.rating}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dividerStyle}>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={doctorsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    return <SafeAreaView style={{ flex: 1, }} backgroundColor="rgba(0,0,0,0)">
        <StatusBar backgroundColor={Colors.primary} />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {search()}
            {doctors()}
        </View>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    headerSearchStyle: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: Sizes.fixPadding,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    headerContainerStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 40.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        alignItems: 'center'
    },
    doctorImageContainerStyle: {
        height: 50.0,
        width: 50.0,
        borderRadius: 75.0,
        backgroundColor: 'white',
        borderColor: '#B3BCFC',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: 'hidden',
    },
    bookContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    bookVideoConsultButtonStyle: {
        width: width / 2 - 30,
        borderColor: '#FF9B07',
        borderWidth: 1.0,
        backgroundColor: '#FFEDD2',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    bookAppointmentButtonStyle: {
        width: width / 2 - 30,
        borderColor: Colors.primary,
        borderWidth: 1.0,
        backgroundColor: '#E3E6FE',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.80,
        marginTop: Sizes.fixPadding * 1.0,
        marginHorizontal: Sizes.fixPadding * 1.0
    }
})

SpecialistScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default SpecialistScreen;
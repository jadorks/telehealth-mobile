import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabScreen from "../navigation/BottomTab";
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import SearchScreen from "../screens/Search/SearchScreen";
import ViewAllScreen from '../screens/ViewAll/ViewAllScreen';
import SpecialistScreen from '../screens/Specialist/SpecialistScreen';
import TimeSlotScreen from '../screens/TimeSlots/TimeSlotsScreen';
import ConsultaionScreen from '../screens/ConsultationDetail/ConsultationDetailScreen';
import PaymentMethodScreen from '../screens/PaymentMethod/PaymentMethodScreen';
import DoctorProfileScreen from '../screens/DoctorProfile/DoctorProfileScreen';
import ReviewScreen from '../screens/Review/ReviewScreen';
import BookingInformationScreen from '../screens/BookingInformation/BookingInformationScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import PatientDirectoryScreen from '../screens/PatientDirectory/PatientDirectoryScreen';
import AboutUsScreen from '../screens/AboutUs/AboutUsScreen';
import SplashScreen from '../screens/SplashScreen';
import LoadingScreen from '../components/LoadingScreen';
import RecordListScreen from '../screens/Records/RecordList';
import RecordDetailScreen from '../screens/Records/RecordDetail';
import QuestionScreen from '../screens/SymptomChecker/QuestionScreen';
import SymptomInputScreen from '../screens/SymptomChecker/SymptomInputScreen';





const Stack = createStackNavigator();

export const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{headerShown: false}} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ViewAll" component={ViewAllScreen} />
            <Stack.Screen name="Specialist" component={SpecialistScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RecordList" component={RecordListScreen} options={{headerShown: true, title: 'Medical Records'}}/>
            <Stack.Screen name="TimeSlots" component={TimeSlotScreen} options={ {title: 'Book a Consultation'} } />
            <Stack.Screen name="Consultation" component={ConsultaionScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="BookingInformation" component={BookingInformationScreen} options={{title: 'Booking Information'}} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="PatientDirectory" component={PatientDirectoryScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="RecordDetail" component={RecordDetailScreen} options={{title: 'Record Details'}} />
            <Stack.Screen name="Questions" component={QuestionScreen} />
            <Stack.Screen name="SymptomInput" component={SymptomInputScreen} options={{title: 'Symptom Input'}}/>
        </Stack.Navigator>
    )
};
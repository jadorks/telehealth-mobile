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
import LabTestAndHealthCheckUpScreen from '../screens/LabAndTestCheckup/LabTestAndHealthCheckUpScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import PatientDirectoryScreen from '../screens/PatientDirectory/PatientDirectoryScreen';
import AboutUsScreen from '../screens/AboutUs/AboutUsScreen';
import SplashScreen from '../screens/SplashScreen';
import LoadingScreen from '../components/LoadingScreen';





const Stack = createStackNavigator();

export const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{headerShown: false}} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ViewAll" component={ViewAllScreen} />
            <Stack.Screen name="Specialist" component={SpecialistScreen} />
            <Stack.Screen name="TimeSlots" component={TimeSlotScreen} />
            <Stack.Screen name="Consultation" component={ConsultaionScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="LabTestAndCheckUp" component={LabTestAndHealthCheckUpScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="PatientDirectory" component={PatientDirectoryScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        </Stack.Navigator>
    )
};
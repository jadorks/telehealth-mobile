import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import BottomTabScreen from "./src/navigation/BottomTab";
import LoadingScreen from './src/components/LoadingScreen';
import NotificationScreen from './src/screens/Notifications/NotificationScreen';
import SearchScreen from "./src/screens/Search/SearchScreen";
import ViewAllScreen from './src/screens/ViewAll/ViewAllScreen';
import SpecialistScreen from './src/screens/Specialist/SpecialistScreen';
import TimeSlotScreen from './src/screens/TimeSlots/TimeSlotsScreen';
import ConsultaionScreen from './src/screens/ConsultationDetail/ConsultationDetailScreen';
import PaymentMethodScreen from './src/screens/PaymentMethod/PaymentMethodScreen';
import DoctorProfileScreen from './src/screens/DoctorProfile/DoctorProfileScreen';
import ReviewScreen from './src/screens/Review/ReviewScreen';
import LabTestAndHealthCheckUpScreen from './src/screens/LabAndTestCheckup/LabTestAndHealthCheckUpScreen';
import MessageScreen from './src/screens/Message/MessageScreen';
import EditProfileScreen from './src/screens/EditProfile/EditProfileScreen';
import PatientDirectoryScreen from './src/screens/PatientDirectory/PatientDirectoryScreen';
import AboutUsScreen from './src/screens/AboutUs/AboutUsScreen';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import VerificationScreen from './src/screens/Auth/VerificationScreen';
import SplashScreen from './src/screens/SplashScreen';

const navigator = createAppContainer(
  createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    mainFlow: createStackNavigator({
      Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      Register: RegisterScreen,
      Verification: VerificationScreen,
      Splash: SplashScreen,
      BottomTabScreen: {
        screen: BottomTabScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Notification: NotificationScreen,
      Search: SearchScreen,
      ViewAll: ViewAllScreen,
      Specialist: SpecialistScreen,
      TimeSlots: TimeSlotScreen,
      Consultation: ConsultaionScreen,
      PaymentMethod: PaymentMethodScreen,
      DoctorProfile: DoctorProfileScreen,
      Review: ReviewScreen,
      LabTestAndCheckUp: LabTestAndHealthCheckUpScreen,
      Message: MessageScreen,
      EditProfile: EditProfileScreen,
      PatientDirectory: PatientDirectoryScreen,
      AboutUs: AboutUsScreen,
    }),
  },
    {
      initialRouteName: 'LoadingScreen',
      defaultNavigationOptions: {
        //header: () => null
        title: 'DoctorPro'
      }
    })
)

const App = navigator;

export default () => {
  return <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
}
//console.ignoredYellowBox = ['Calling getNode()']







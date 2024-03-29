import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../context/Auth';
import SplashScreen from '../screens/SplashScreen';

export const Router = () => {
    const {authData, loading} = useAuth();

    if(loading){
        return <SplashScreen />;
    }
    return(
        <NavigationContainer>
            {authData ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};
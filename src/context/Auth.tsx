import React, {createContext, useState, useContext, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Font from "expo-font";

import { AuthData, currentPatient, loginPatient, registerPatient } from '../api/authentication';

type AuthContextData = {
    authData?: AuthData;
    patientInfo?: any;
    loading: boolean;
    signIn(user_data): Promise<void>;
    signUp(user_data): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [authData, setAuthData] = useState<AuthData>();
    const [patientInfo, setPatientInfo] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try{
            const authDataSerialized = await SecureStore.getItemAsync('AuthData');
            const patientInfoSerialized = await SecureStore.getItemAsync('PatientInfo');
            if(authDataSerialized && patientInfoSerialized){
                const _authData: AuthData = JSON.parse(authDataSerialized);
                const _patientInfo = JSON.parse(patientInfoSerialized);
                setAuthData(_authData);
                setPatientInfo(_patientInfo);
            }
        } catch (error) {

        } finally {
            await Font.loadAsync({
                NotoSans_Bold: require("../assets/fonts/NotoSans-Bold.ttf"),
                NotoSans_Regular: require("../assets/fonts/NotoSans-Regular.ttf"),
            });
            setLoading(false);
        }
    }

    const signUp = async (user_data) => {

        const _authData = await registerPatient(user_data);
        if(_authData){
            setAuthData(_authData);
            await SecureStore.setItemAsync('AuthData', JSON.stringify(_authData));

            const patientData = await currentPatient(_authData.access_token);
            setPatientInfo(patientData);
            await SecureStore.setItemAsync('PatientInfo', JSON.stringify(patientData));
        }else{
            setAuthData(undefined);
            setPatientInfo(undefined);
        }
        
    }

    const signIn = async (user_data) => {
        const _authData = await loginPatient(user_data);
        if(_authData){
            setAuthData(_authData);
            await SecureStore.setItemAsync('AuthData', JSON.stringify(_authData));
            
            const patientData = await currentPatient(_authData.access_token);
            setPatientInfo(patientData);
            await SecureStore.setItemAsync('PatientInfo', JSON.stringify(patientData));
            
        }else{
            setAuthData(undefined);
            setPatientInfo(undefined);
        }
    }

    const signOut = async () => {
        setAuthData(undefined);
        setPatientInfo(undefined);
        await SecureStore.deleteItemAsync('AuthData');
        await SecureStore.deleteItemAsync('PatientInfo');
    };

    return(
        <AuthContext.Provider value={{authData, patientInfo, loading, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export {AuthContext, AuthProvider, useAuth};




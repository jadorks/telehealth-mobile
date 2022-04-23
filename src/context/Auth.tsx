import React, {createContext, useState, useContext, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Font from "expo-font";

import { AuthData, loginPatient, registerPatient } from '../api/authentication';

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(user_data): Promise<void>;
    signUp(user_data): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [authData, setAuthData] = useState<AuthData>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try{
            const authDataSerialized = await SecureStore.getItemAsync('AuthData');
            if(authDataSerialized){
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
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
        }else{
            setAuthData(undefined)
        }
        
    }

    const signIn = async (user_data) => {
        const _authData = await loginPatient(user_data);
        if(_authData){
            setAuthData(_authData);
            await SecureStore.setItemAsync('AuthData', JSON.stringify(_authData));
        }else{
            setAuthData(undefined);
        }
    }

    const signOut = async () => {
        setAuthData(undefined);
        await SecureStore.deleteItemAsync('AuthData');
    };

    return(
        <AuthContext.Provider value={{authData, loading, signIn, signUp, signOut}}>
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




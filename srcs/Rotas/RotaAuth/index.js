import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../../Pages/Intro';
import LoginScreen from '../../Pages/LoginScreen';
import VerificaIdade from '../../Pages/VerificaIdade';
import LocationScreen from '../../Pages/LocationScreen';
import MapScreen from '../../Pages/MapScreen';
import MainHome from '../../Pages/MainHome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function RotaAuth() {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        const storeData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@Intro')
                jsonValue != null ? JSON.parse(jsonValue) : null;
                const response = JSON.parse(jsonValue);
                if (response) {
                    setIsUser(response)
                } else {
                    setIsUser(false)
                }
            } catch (e) {

            }
        }
        storeData()
    }, [])

    return (
        <>
            {isUser != null ?
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={isUser ? 'LoginScreen' : 'Intro'}>
                    <Stack.Screen
                        name='Intro'
                        component={Intro}
                    />
                    <Stack.Screen
                        name='LoginScreen'
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name='VerificaIdade'
                        component={VerificaIdade}
                    />
                    <Stack.Screen
                        name='LocationScreen'
                        component={LocationScreen}
                    />
                    <Stack.Screen
                        name='MapScreen'
                        component={MapScreen}
                        options={{
                            headerShown: true,
                            headerShadowVisible: false,
                            headerTitle: 'INDICAR LOCAL NO MAPA',
                            headerTitleStyle: {
                                fontSize: 14,
                            },
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <Icon onPress={() => navigation.navigate('LocationScreen')} name='arrow-back-outline' size={25} color={'black'} />
                            )
                        }}
                    />
                    <Stack.Screen
                        name='MainHome'
                        component={MainHome}
                    />
                </Stack.Navigator>
                :
                null
        }
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../../Componentes/Background';
import InputNormal from '../../Componentes/InputNormal';
import Checkbox from 'expo-checkbox';
import { CorAmareloEscuro, CorAmareloPadrao, CorApple, CorBrancaBG, CorCinzaCheck, CorDisable, CorDisableTxt, CorFacebook } from '../../Colors';
import BotaoNormal from '../../Componentes/BotaoNormal';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


const css = StyleSheet.create({
    ContainerHeader: {
        height: '100%',
        backgroundColor: 'white',
    },
    AppBarImagem: {
        width: '100%',
        marginTop: -60
    },

    containerOne: {

    },

    containerTwo: {
        padding: 22
    },

    txtTitle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    },

    txtSub: {
        textAlign: 'center',
        fontSize: 18

    },

    checkbox: {
        margin: 8,
    },

    containerCheck: {
        flexDirection: 'row',
        height: 30,
        width: '100%',
        alignItems: 'center',
        marginLeft: 15,
    },

    txtCheck: {
        fontSize: 15,
        color: CorCinzaCheck,
        marginLeft: 5
    },

    txtIntro: {
        textAlign: 'center',
        color: CorAmareloEscuro,
        fontWeight: 'bold',
        marginTop: 30
    },

    containerDivisor: {
        height: 40,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10%',
        marginTop: -10,
        marginBottom: -10,
    },

    divisor: {
        height: 1,
        width: '50%',
        backgroundColor: 'black'
    },



});

function SalvaEmail({ description, valueCheck, setValueCheck }) {
    return (
        <View style={css.containerCheck}>
            <Checkbox style={css.checkbox} value={valueCheck} onValueChange={setValueCheck} color={valueCheck ? CorAmareloPadrao : CorDisable} />
            <Text style={css.txtCheck}>{description}</Text>
        </View>
    )
}

function Divisor() {
    return (
        <View style={css.containerDivisor}>
            <View style={css.divisor} />
            <Text> OU </Text>
            <View style={css.divisor} />
        </View>
    )
}

export default function LoginScreen({ navigation }) {
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('A permissão para acessar o local foi negada!');
                return;
            }
            let LocationUser = await Location.getCurrentPositionAsync({});
            setLocation(LocationUser); 
            saveData(LocationUser); 
        })();
    }, []);

    const saveData = async (valor) => {
        try {
            const jsonValue = JSON.stringify(valor)
            await AsyncStorage.setItem('@save_local', jsonValue); 
        } catch (e) {
            // saving error
        }
    }

    const handlerBotaoEmail = () => {
        if (email.includes('.com')) {
            alert('Proxima screen')
        }
    }

    const handlerAvanca = async () => {

        try {
            const jsonValue = await AsyncStorage.getItem('@save_Idade')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            const response = JSON.parse(jsonValue);
            if (response == true) {
                navigation.navigate('LocationScreen');
            } else {
                navigation.navigate('VerificaIdade');
            }
        } catch (e) {
            // error reading value
        }

    }

    return (
        <Background colorBG={'black'}>
            {Platform.OS == 'ios' ?
                <StatusBar /> :
                <StatusBar hidden={true} />}
            <View style={css.ContainerHeader}>
            <ScrollView>
                <Image style={css.AppBarImagem} resizeMode='contain' source={require('../../Imgs/logoze.png')} />
                    <View style={css.containerOne}>
                        <Text style={css.txtTitle}>Que bom que você está aqui!</Text>
                        <Text style={css.txtSub}>Como deseja continuar?</Text>
                        <InputNormal
                            typeInput={'email-address'}
                            hint={'E-mail'}
                            valor={email}
                            setValor={setEmail}
                            TitleInput={'E-mail'}
                            CorBordaAtiva={CorAmareloPadrao}
                            CorTitleAtiva={CorAmareloPadrao}
                            isDesativado={false}
                        />
                        <SalvaEmail
                            description={'Salvar e-mail'}
                            valueCheck={isChecked}
                            setValueCheck={setChecked}
                        />
                        <View style={{ padding: 22 }}>
                            <BotaoNormal
                                top={1}
                                colorBotao={email.includes('.com') ? CorAmareloPadrao : CorDisable}
                                txt={'CONTINUAR COM E-MAIL'}
                                txtColor={email.includes('.com') ? 'black' : CorDisableTxt}
                                temIcon={false}
                                acaoBotao={handlerBotaoEmail}
                            />
                        </View>
                    </View>
                    <Divisor />
                    <View style={css.containerTwo}>

                        <BotaoNormal
                            top={5}
                            colorBotao={CorFacebook}
                            txt={'CONTINUAR COM FACEBOOK'}
                            txtColor={CorBrancaBG}
                            temIcon={true}
                            nameIcon={'logo-facebook'}
                            colorIcon={CorBrancaBG}
                        />
                        <BotaoNormal
                            top={20}
                            colorBotao={CorApple}
                            txt={'CONTINUAR COM A APPLE'}
                            txtColor={CorBrancaBG}
                            temIcon={true}
                            nameIcon={'logo-apple'}
                            colorIcon={CorBrancaBG}
                        />

                        <TouchableOpacity onPress={() => handlerAvanca()}>
                            <Text style={css.txtIntro}>Continuar sem cadastro</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> 
            </View>
        </Background>
    );
}
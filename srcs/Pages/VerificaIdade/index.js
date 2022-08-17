import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform, StatusBar, Image, StyleSheet, Text } from 'react-native';
import { CorAmareloPadrao, CorBrancaBG } from '../../Colors';
import Background from '../../Componentes/Background';
import BotaoNormal from '../../Componentes/BotaoNormal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const css = StyleSheet.create({
    ContainerHeader: {
        height: '33%',
        backgroundColor: 'white',
    },
    AppBarImagem: {
        width: '100%',
        marginTop: -60
    },
    txtTitle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    },
    txtSub: {
        textAlign: 'center',
        fontSize: 20
    },
    ContainerBody: {
        height: '28%',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    ContainerFooter: {
        height: '39%',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'flex-end',
    }
})

export default function VerificaIdade({navigation}) {

    const [isMaior, setIsMaior] = useState(null);

    const handlerIsMaior = () => {
        setIsMaior(true);
    }

    useEffect(() => {
        const saveData = async () => {
            try {
                const jsonValue = JSON.stringify(isMaior)
                await AsyncStorage.setItem('@save_Idade', jsonValue) 
            } catch (e) {
                // saving error
            }
        }
        saveData();
        if(isMaior == true){
            navigation.navigate('LocationScreen')
        }
    }, [isMaior])

    return (
        <Background colorBG={'black'}>
            {Platform.OS == 'ios' ?
                <StatusBar /> :
                <StatusBar hidden={true} />}
            <View style={css.ContainerHeader}>
                <Image style={css.AppBarImagem} resizeMode='contain' source={require('../../Imgs/logoze.png')} />
            </View>

            <View style={css.ContainerBody}>
                <Text style={css.txtSub}>Antes de continuar...</Text>
                <Text style={css.txtTitle}>Você tem 18 anos ou mais?</Text>
            </View>

            <View style={css.ContainerFooter}>
                <BotaoNormal
                    txt={'Sim'}
                    acaoBotao={handlerIsMaior}
                    colorBotao={CorAmareloPadrao}
                />
                <BotaoNormal
                    top={15}
                    txt={'Não'}
                    colorBotao={CorBrancaBG}
                    tamBorda={1}
                    corBorda={'#000'}
                />
            </View>
        </Background>
    );
}
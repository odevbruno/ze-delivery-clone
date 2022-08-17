import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppIntroSlider from 'react-native-app-intro-slider';
import { CorAmareloPadrao, CorAmareloEscuro } from '../../Colors';
import BotaoRedondoIntro from '../../Componentes/BotaoRedondoIntro';
import Background from '../../Componentes/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';

const css = StyleSheet.create({
    BGIntro: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'black'
    },
    stiloContainer: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height
    },
    AppBarImagem: {
        width: '100%',
        marginTop: -15
    },
    containerSlide: {
        height: 550,
        marginTop: 100,
        width: '100%',
    },
    textTitle: {
        color: '#2e2e2e',
        fontSize: 18,
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center',
    },
    textSub: {
        color: '#393939',
        fontSize: 15,
        width: '60%',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25
    },
    ImagemSlide: {
        height: 150,
        width: '100%'
    },
    containerFooter: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtIntro: {
        textAlign: 'center',
        color: CorAmareloEscuro,
        fontWeight: 'bold',
        marginTop: 10
    },
    containerItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%'
    }
})

const slides = [
    {
        key: 1,
        title: 'Suas bebidas geladas pra já!',
        desc: 'Cervejas trincando, refrigerantes e sucos gelados, vinhos, destilados e muito mais! Temos até salgadinhos, carvão e gelo para acompanhar.',
        image: require('../../Imgs/step2.png')
    },
    {
        key: 2,
        title: 'Você recebe no conforto de onde está, sem precisar sair.',
        desc: 'Seu pedido é atendimento por um estabelecimento perto da sua região, que leva tudo até você. A maioria dos pedidos é entregue em até 1 hora. ;)',
        image: require('../../Imgs/step1.png')
    },
    {
        key: 3,
        title: 'O melhor de tudo? Preços baixos!',
        desc: 'Aqui você encontra bebidas pelo mesmo preço do mercado (ou até mais baratas) e várias ofertas exclusivas!',
        image: require('../../Imgs/step3.png')
    },
];

function renderSliders({ item }) {
    return (
        <View style={css.containerItem}>
            <Image style={css.ImagemSlide} source={item.image} />
            {item.key == 3 ?
                <Text style={[css.textTitle, { width: '40%' }]}>{item.title}</Text>
                :
                <Text style={css.textTitle}>{item.title}</Text>
            }
            <Text style={css.textSub}>{item.desc}</Text>
        </View>
    )
}

function botaoNext() {
    return (
        <BotaoRedondoIntro txt={'CONTINUAR'} />
    )
}

function botaoDone() {
    return (
        <BotaoRedondoIntro txt={'QUERO CONHECER'} />

    )
}

export default function Intro({ navigation }) {
    const stepIntro = true;

    const AvancaLogin = () => {
        saveData(stepIntro);
        navigation.navigate('LoginScreen');
    }

    const saveData = async (valor) => {
        try {
            const jsonValue = JSON.stringify(valor)
            await AsyncStorage.setItem('@Intro', jsonValue);
        } catch (e) {
            // saving error
        }
    }

    return (
        <Background colorBG={'black'}>
            {Platform.OS == 'ios' ?
                <StatusBar /> :
                <StatusBar hidden={true} />}
            <View style={css.stiloContainer}>
                <Image style={css.AppBarImagem} resizeMode='contain' source={require('../../Imgs/top.png')} />
                <ScrollView>
                    <View style={css.containerSlide}>
                        <AppIntroSlider
                            data={slides}
                            renderItem={renderSliders}
                            bottomButton={true}
                            activeDotStyle={{
                                backgroundColor: CorAmareloPadrao
                            }}
                            renderNextButton={botaoNext}
                            renderDoneButton={botaoDone}
                            onDone={AvancaLogin}
                        />
                        <TouchableOpacity onPress={() => AvancaLogin()}>
                            <Text style={css.txtIntro}>Pular Introdução</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Background>
    );
}
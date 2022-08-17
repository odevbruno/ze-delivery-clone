import React, { useState } from 'react';
import { Platform, StatusBar, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CorAmareloEscuro, CorAmareloEscuroForte, CorAmareloPadrao, CorDisable, CorDisableIcon } from '../../Colors';
import Background from '../../Componentes/Background';
import BotaoNormal from '../../Componentes/BotaoNormal';
import Divisor from '../../Componentes/Divisor';
import InputIcon from '../../Componentes/InputIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const css = StyleSheet.create({
  Container: {
    height: '80%',
    backgroundColor: 'white',
  },
  txtTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
    paddingTop: 10,
    marginTop: 30,
    marginBottom: 10
  },
  txtLocate: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    color: CorAmareloEscuro,
    paddingLeft: 15
  },
  botao: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10
  },
  containerFooter: {
    height: '20%',
    backgroundColor: 'white',
    padding: 20
  }
});

function BotaoMyLocation({ acao }) {
  return (
    <TouchableOpacity
      onPress={() => acao()}
      style={css.botao}>
      <Icon name='crosshairs-gps' size={25} color={CorDisableIcon} />
      <Text style={css.txtLocate}>Usar minha localização</Text>
    </TouchableOpacity>
  )
}

export default function LocationScreen({ navigation }) {
  const [endereco, setEndereco] = useState('');

  const limpaInput = () => {
    setEndereco('');
  }

  const handlerScreenMap = () => {
    navigation.navigate('MapScreen');
  }

  const handlerMainHome = () => {
    if (endereco == '') return Alert.alert('Espera um pouco', 'Você precisa inserir nome da rua, bairro, cidade e número para continuar!');
    saveData(endereco).then(()=>{
      navigation.navigate('MainHome');
    })
  }

  const saveData = async (valor) => {
    try {
      const jsonValue = JSON.stringify(valor)
      await AsyncStorage.setItem('@save_endereco', jsonValue); 
    } catch (e) {
      // saving error
    }
  }

  return (
    <Background colorBG={'black'}>
      {Platform.OS == 'ios' ?
        <StatusBar /> :
        <StatusBar hidden={true} />
      }
      <View style={css.Container}>
        <Text style={css.txtTitle}>Onde você quer receber suas bebidas ?</Text>

        <InputIcon
          hint={'Inserir endereço com número'}
          acaoInput={handlerMainHome}
          iconName={'location-outline'}
          colorIcon={CorDisableIcon}
          setValor={setEndereco}
          acaoClose={limpaInput}
          valor={endereco}
          keyType={'send'}
          sizeIcon={25}
        />

        <BotaoMyLocation
          acao={handlerScreenMap}
        />

        <Divisor />
      </View>

      <View style={css.containerFooter}>
        {endereco != '' ?
          <BotaoNormal
            colorBotao={CorAmareloPadrao}
            acaoBotao={handlerMainHome}
            txt={'CONTINUAR'}
          />
          :
          null
        }
      </View>
    </Background>
  );
}
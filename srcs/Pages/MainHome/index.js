import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar, Platform, BackHandler, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CorAmareloPadrao, CorDisable, CorDisableIcon, CorDisableTxt, CorTxtPretoFosco } from '../../Colors';
import Background from '../../Componentes/Background';
import { SliderBox } from "react-native-image-slider-box";

const css = StyleSheet.create({
  Header: {
    height: '19%',
    backgroundColor: '#1a1a1a'
  },
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  row: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
  },
  txt: {
    color: 'white',
    fontSize: 13, fontWeight: '600'
  },
  boxTxt: {
    marginLeft: 20
  },
  botaoFlutuanteMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleImg: {
    height: 45,
    width: 45,
    backgroundColor: CorAmareloPadrao,
    borderRadius: 30
  },
  IconFlutuante: {
    position: 'absolute',
    right: 19,
    top: 30
  },
  boxSearch: {
    height: 55,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
  },
  left: {
    marginLeft: 20
  },
  containerImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 405,
    marginBottom: 10
  },
  slideStyle: {
    margin: 20,
    width: '90%',
    height: 330,
    marginTop: 20,
    borderRadius: 20,
  },
  StyleDivisor: {
    height: 7,
    backgroundColor: CorDisable
  },
  boxCategorias: {
    height: '25%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10
  },
  botaoCateg: {
    height: 50,
    margin: 10,
    marginLeft: 8,
    paddingLeft: 10,
    marginTop: 2,
    width: '93%',
    borderWidth: 2,
    borderColor: CorDisable,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center'
  },
  iconBotao: {
    height: 25,
    width: 25,
    marginLeft: 5,
  },
  colum: {
    height: '100%',
    width: '50%',
    backgroundColor: 'white',
  },
  txtBotao: {
    marginLeft: 10,
    color: CorTxtPretoFosco
  }
})

function BoxHeader({ txtEndereco }) {
  let stringEndereco = 'Aguarde, recebendo informações';
  let stringNumero = '';

  if (txtEndereco != null) {
    const { endereco, numero } = txtEndereco;
    stringEndereco = endereco;
    stringNumero = numero;
  }

  return (
    <View style={css.Header}>
      <View style={css.row}>

        <TouchableOpacity>
          <Image
            resizeMode='contain'
            source={require('../../Imgs/userIcon.png')}
            style={css.styleImg}
          />
          <View style={css.botaoFlutuanteMenu}>
            <Icon name="menu" size={17} color={'black'} />
          </View>
        </TouchableOpacity>

        <View style={css.boxTxt}>
          <Text style={css.txt}>Receber agora em</Text>
          <Text style={[css.txt, { color: CorAmareloPadrao }]}>{stringEndereco}, {stringNumero} - Casa</Text>
        </View>

        <Icon onPress={() => alert('Click')} style={css.IconFlutuante} name="chevron-down-outline" size={20} color={'white'} />
      </View>
      <BoxSearch />
    </View>
  )
}

function BarApp() {
  return (
    <>
      {Platform.OS == 'ios' ?
        <StatusBar barStyle={'light-content'} />
        :
        <StatusBar barStyle={'light-content'} hidden={false} />
      }
    </>
  )
}

function BoxSearch() {
  return (
    <Pressable onPress={() => alert('Click')} style={css.boxSearch}>
      <Icon style={css.left} name='search-outline' size={20} color={CorDisableIcon} />
      <Text style={[css.boxTxt, { color: CorDisableTxt }]}>Pesquise sua bebida favorita</Text>
    </Pressable>
  )
}

function Carrosel({ Images }) {
  return (
    <View style={css.containerImage}>
      <SliderBox
        paginationBoxStyle={{ width: 40 }}
        style={css.slideStyle}
        images={Images}
        sliderBoxHeight={300}
        dotColor={CorAmareloPadrao}
        inactiveDotColor="#90A4AE"
      />
    </View>
  )
}

function Divisor() {
  return (
    <View style={css.StyleDivisor} />
  )
}

function BoxBotoesCategorias() {
  return (
    <View style={css.boxCategorias}>

      <View style={css.colum}>
        <BotaoCategoria
          img={require('../../Imgs/iconCerveja.png')}
          title={'Cervejas'}
        />
        <BotaoCategoria
          img={require('../../Imgs/iconVinhos.png')}
          title={'Vinhos'}
        />
        <BotaoCategoria
          img={require('../../Imgs/iconLoja.png')}
          title={'Lojinha'}
        />
      </View>

      <View style={css.colum}>
        <BotaoCategoria
          img={require('../../Imgs/iconDestilados.png')}
          title={'Destilados'}
        />
        <BotaoCategoria
          img={require('../../Imgs/iconSemalcool.png')}
          title={'Sem Álcool'}
        />
        <BotaoCategoria
          img={require('../../Imgs/iconComida.png')}
          title={'Comidinhas'}
        />
      </View>

    </View>
  )
}

function BotaoCategoria({ acaoBotao, img, title }) {
  return (
    <Pressable
      style={css.botaoCateg}
      onPress={() => acaoBotao()}>
      <Image
        style={css.iconBotao}
        source={img}
      />
      <Text style={css.txtBotao}>{title}</Text>
    </Pressable>
  )
}

export default function MainHome() {
  const [endereco, setEndereco] = useState(null);

  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@save_endereco')
        jsonValue != null ? JSON.parse(jsonValue) : null;
        const response = JSON.parse(jsonValue);
        setEndereco(response);
      } catch (e) {

      }
    }
    storeData()
  }, [])

  const imgs = [
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
    require('../../Imgs/imgPromo5.png'),
    require('../../Imgs/imgPromo3.jpg'),
  ]

  return (
    <Background colorBG={'#1a1a1a'}>
      <BarApp />
      <ScrollView 
      style={{ height: '100%'}}
      showsVerticalScrollIndicator={false}> 
      <View style={css.container}>
        <BoxHeader txtEndereco={endereco} />
        <Carrosel Images={imgs} />
        <Divisor />
        <BoxBotoesCategorias />
        <Divisor />
      </View>
      </ScrollView>
    </Background>
  );
}
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CorAmareloPadrao } from '../../Colors';

const css = StyleSheet.create({
  botao: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  txtBotao: {
    textAlign: 'center',
    fontSize: 14, 
  },
  Icon:{
    position: 'absolute',
    left: 20
  }
});

export default function BotaoNormal({ txt, colorBotao, acaoBotao, top, txtColor, temIcon, nameIcon, colorIcon, corBorda, tamBorda }) {
  return (
    <TouchableOpacity onPress={() => acaoBotao()} style={[css.botao, { backgroundColor: colorBotao, marginTop: top, borderWidth: tamBorda, borderColor: corBorda  }]}>
      {temIcon ?
        <Icon style={css.Icon} name={nameIcon} size={27} color={colorIcon} />
        :
        null
      }
      <Text style={[css.txtBotao, { color: txtColor }]}>{txt}</Text>
    </TouchableOpacity>
  );
}
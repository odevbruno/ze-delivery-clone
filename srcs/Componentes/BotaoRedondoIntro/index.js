import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CorAmareloPadrao } from '../../Colors';

const css = StyleSheet.create({
  botao: {
    height: 50,
    width: '100%',
    backgroundColor: CorAmareloPadrao,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 60
  },
  txtBotao: {
    textAlign: 'center',
    fontSize: 15
  }
});

export default function BotaoRedondoIntro({ txt }) {
  return (
    <View style={css.botao}>
      <Text style={css.txtBotao}>{txt}</Text>
    </View>
  );
}
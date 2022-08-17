import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { CorAmareloEscuro, CorAmareloPadrao, CorCinzaCheck, CorDisable, CorDisableTxt } from '../../Colors';

const css = StyleSheet.create({
    Input: {
        height: 55,
        borderWidth: 1,
        borderRadius: 10,
        margin: 15,
        paddingLeft: 18,
        fontSize: 14,
        justifyContent: 'center',
    },
    TitleInputTxt: {
        fontSize: 13,
        marginTop: -1,
        marginBottom: 5
    }
})

export default function InputNormal({ hint, setValor, valor, senha, typeInput, TitleInput, CorBordaAtiva, CorTitleAtiva, top, customWid, isDesativado}) {
    return (
        <View
            style={[css.Input, { borderColor: valor != '' ? CorBordaAtiva : CorDisable, marginTop: top, width: customWid }]}
        >
            {valor != '' ?
                <Text style={[css.TitleInputTxt, { color: valor != '' ? CorTitleAtiva : CorDisable }]}>
                    {TitleInput}
                </Text> : null}
            <TextInput
                editable={isDesativado ? false : true }
                placeholder={hint}
                placeholderTextColor={CorDisable}
                onChangeText={setValor}
                value={valor}
                keyboardType={typeInput}
            />
        </View>
    );
}
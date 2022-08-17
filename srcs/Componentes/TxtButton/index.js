import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CorAmareloEscuro } from '../../Colors';

const css = StyleSheet.create({
    styleTxt:{
        textAlign: 'center',
        color: CorAmareloEscuro,
        fontWeight: 'bold',
        marginTop: 30
    }
});

export default function TxtButton({acaoBotao, title}) {
    return (
        <TouchableOpacity onPress={() => acaoBotao()}>
            <Text style={css.styleTxt}>{title}</Text>
        </TouchableOpacity>
    );
}
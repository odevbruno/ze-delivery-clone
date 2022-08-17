import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { CorAmareloPadrao, CorCinzaCheck, CorDisable, CorDisableTxt } from '../../Colors';

const css = StyleSheet.create({
    containerCheck: {
        flexDirection: 'row',
        height: 30, 
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    checkbox: {
        margin: 8,
    },
    txtCheck: {
        fontSize: 13,
        color: CorDisableTxt,
        marginLeft: 5
    },
})

export default function Check({valueCheck, setValueCheck, description}) {
    return (
        <View style={css.containerCheck}>
            <Checkbox style={css.checkbox} value={valueCheck} onValueChange={setValueCheck} color={valueCheck ? CorAmareloPadrao : CorDisable} />
            <Text style={css.txtCheck}>{description}</Text>
        </View>
    );
}
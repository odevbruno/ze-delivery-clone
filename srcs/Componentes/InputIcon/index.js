import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CorAmareloEscuro, CorAmareloPadrao, CorCinzaCheck, CorDisable } from '../../Colors';

const css = StyleSheet.create({
    InputView: {
        height: 48,
        borderWidth: 1,
        borderRadius: 10,
        margin: 15,
        paddingLeft: 18,
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: CorDisable
    },

    inputText: {
        width: '83%',
        paddingLeft: 20
    }
})

export default function InputIcon({ hint, setValor, valor, senha, typeInput, iconName, sizeIcon, colorIcon , acaoClose, acaoInput, keyType}) {
    return (
        <View
            style={css.InputView}>
            <Icon name={iconName} size={sizeIcon} color={colorIcon} />
            <TextInput
                style={css.inputText}
                placeholder={hint}
                placeholderTextColor={CorDisable}
                onChangeText={setValor}
                value={valor}
                keyboardType={typeInput}
                onSubmitEditing={acaoInput}
                returnKeyType={keyType}
            />
            {valor != '' ?
                <TouchableOpacity onPress={()=> acaoClose()}>
                    <Icon name={'close'} size={sizeIcon} color={colorIcon} />
                </TouchableOpacity>
                :
                null
            }
        </View>
    );
}
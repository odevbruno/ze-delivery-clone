import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const css = StyleSheet.create({
    BGIntro: {
        flex: 1, 
        alignItems: "center",
        width: '100%',
        marginTop: StatusBar.currentHeight,
    },
})

export default function KeyboardAvoidView({children}) {
    return (
        <KeyboardAvoidingView style={css.BGIntro} behavior={'padding'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
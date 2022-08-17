import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const css = StyleSheet.create({
    BGIntro: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: StatusBar.currentHeight,
    },
    container: {
        flex: 1
    }
})
export default function Background({ colorBG, children }) {
    return (
        <SafeAreaView style={[css.BGIntro, { backgroundColor: colorBG }]}>
            <KeyboardAvoidingView style={css.BGIntro} behavior={'padding'}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


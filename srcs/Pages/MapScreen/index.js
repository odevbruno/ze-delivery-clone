import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, Dimensions, Pressable, StyleSheet, Text, Image, Modal, ScrollView } from 'react-native';
import Background from '../../Componentes/Background';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoNormal from '../../Componentes/BotaoNormal';
import { CorAmareloPadrao, CorDisable, CorDisableIcon, CorDisableTxt, CorTxtPretoFosco } from '../../Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputNormal from '../../Componentes/InputNormal';
import KeyboardAvoidView from '../../Componentes/KeyboardAvoidView';
import Check from '../../Componentes/Check';
import TxtButton from '../../Componentes/TxtButton';


const css = StyleSheet.create({
    containerMap: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    containerAviso: {
        position: "absolute",
        top: '65%',
        backfaceVisibility: 'hidden',
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
        elevation: 3,
    },
    BoxAviso: {
        position: "absolute",
        left: '18%',
        right: '18%',
        top: '65%',
        alignItems: "center",
        justifyContent: 'center',
        height: 70,
        elevation: 2,
        backgroundColor: '#fefbec',
        paddingLeft: 18,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: CorAmareloPadrao,
        borderRadius: 10
    },
    txtAviso: {
        color: CorDisableTxt,
        width: '100%'
    },
    Footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,
        backfaceVisibility: 'hidden',
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
        alignItems: "center",
        elevation: 3,
    },
    StyleMarker: {
        height: 70,
        width: 40
    },
    modalView: {
        height: '80%',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 5,
        shadowRadius: '200%',
        elevation: 5,
        width: '100%',
        marginTop: '50%',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        marginBottom: 3,
        paddingRight: '28%',
        color: CorDisableTxt
    },
    txtTitleModal: {
        textAlign: 'left',
        color: CorTxtPretoFosco,
        marginLeft: 10
    },
    containerHeaderModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    containerBodyModal: {
        width: '100%',
    },
    containerFooterModal: {
        width: '100%',
        padding: 10
    },
    row: {
        flexDirection: 'row',
    }
})

function ModalEndereco({ visible, closeModal, dataEndereco, nextTela }) {
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [pontoRef, setPontoRef] = useState('');
    const [bairro, setBairro] = useState('');
    const [noNumber, setNoNumber] = useState(false);
    const [noComplemento, setNoComplemento] = useState(false);

    useEffect(() => {
        if (noNumber == true) return setNumero('');
        if (noComplemento == true) return setComplemento('');
    }, [noNumber, noComplemento]);

    let txtBairro = '';
    let txtCidade = '';
    let txtEstado = '';
    let txtNumero = '';
    let txtRua = '';

    if (dataEndereco != null) {
        const { Bairro, Cidade, Estado, Numero, Rua } = dataEndereco;
        txtBairro = Bairro;
        txtCidade = Cidade,
            txtEstado = Estado,
            txtNumero = Numero,
            txtRua = Rua
    }

    useEffect(() => {
        setEndereco(txtRua),
            setNumero(txtNumero),
            setBairro(txtBairro);
    }, [dataEndereco]);

    const handlerDadosEndereco = () => {
        let fullEndereco = {
            endereco: endereco,
            numero: noNumber == true || numero == '' ? 'Sem número' : numero,
            complemento: noNumber == true || complemento == '' ? 'Sem complemento' : complemento,
            pontoRef: pontoRef == '' ? 'Sem ponto de referência' : pontoRef,
            bairro: bairro,
            cidade: txtCidade,
            estado: txtEstado
        }
        saveData(fullEndereco).then(()=>{
            nextTela() 
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
        <Modal
            statusBarTranslucent={true}
            animationType='fade'
            transparent={true}
            visible={visible}
        >
            <KeyboardAvoidView>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={css.modalView}>
                        <View style={css.containerHeaderModal}>
                            <Text style={css.modalText}>Conferir endereço</Text>
                            <Icon onPress={() => closeModal()} name='close' size={28} color={CorDisableIcon} />
                        </View>

                        <View style={css.containerBodyModal}>
                            <Text style={[css.txtTitleModal, { marginTop: 20 }]}>Esse é o endereço do local indicado no mapa.</Text>
                            <Text style={css.txtTitleModal}>Você pode editar o texto, se necessário.</Text>

                            <InputNormal
                                CorBordaAtiva={CorDisable}
                                CorTitleAtiva={CorDisableTxt}
                                TitleInput={'Endereço'}
                                hint={'Endereço'}
                                setValor={setEndereco}
                                valor={endereco}
                                isDesativado={false}
                            />

                            <View style={css.row}>
                                <InputNormal
                                    isDesativado={noNumber ? true : false}
                                    customWid={'25%'}
                                    CorBordaAtiva={CorDisable}
                                    CorTitleAtiva={CorDisableTxt}
                                    TitleInput={'Número'}
                                    hint={'Número'}
                                    setValor={setNumero}
                                    valor={numero}
                                    typeInput={'numeric'}
                                />
                                <InputNormal
                                    isDesativado={noComplemento ? true : false}
                                    customWid={'60%'}
                                    CorBordaAtiva={CorDisable}
                                    CorTitleAtiva={CorDisableTxt}
                                    TitleInput={'Complemento'}
                                    hint={'Complemento'}
                                    setValor={setComplemento}
                                    valor={complemento}
                                />
                            </View>

                            <View style={css.row}>
                                <Check
                                    description={'Sem número'}
                                    setValueCheck={setNoNumber}
                                    valueCheck={noNumber}
                                />
                                <Check
                                    description={'Não tenho complemento'}
                                    setValueCheck={setNoComplemento}
                                    valueCheck={noComplemento}
                                />
                            </View>

                            <InputNormal
                                CorBordaAtiva={CorDisable}
                                CorTitleAtiva={CorDisableTxt}
                                TitleInput={'Ponto de refrência (opcional)'}
                                hint={'Ponto de refrência (opcional)'}
                                setValor={setPontoRef}
                                valor={pontoRef}
                                isDesativado={false}
                            />

                            <InputNormal
                                CorBordaAtiva={CorDisable}
                                CorTitleAtiva={CorDisableTxt}
                                TitleInput={'Bairro'}
                                hint={'Bairro'}
                                setValor={setBairro}
                                isDesativado={false}
                                valor={bairro}
                            />
                            <Text style={[css.txtTitleModal, { marginTop: 5, textAlign: 'center' }]}>{txtCidade}, {txtEstado}</Text>

                        </View>

                        <View style={css.containerFooterModal}>
                            <BotaoNormal
                                top={40}
                                txt={'CONTINUAR'}
                                colorBotao={CorAmareloPadrao}
                                acaoBotao={handlerDadosEndereco}
                            />
                            <TxtButton
                                title={'Alterar local no mapa'}
                                acaoBotao={closeModal}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidView>

        </Modal>
    );
};
 
export default function MapScreen({ navigation }) {

    const [local, setLocal] = useState(null);
    const [fullEndereco, setFullEndereco] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        const storeData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@save_local')
                jsonValue != null ? JSON.parse(jsonValue) : null;
                const response = JSON.parse(jsonValue);
                if (response != null) {
                    let reqLatitude = response.coords.latitude;
                    let reqLongitude = response.coords.longitude;

                    setLocal({
                        longitude: reqLongitude,
                        latitude: reqLatitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    });
                    reqAddress(reqLatitude, reqLongitude);

                } else {
                    (async () => {
                        let { status } = await Location.requestForegroundPermissionsAsync();
                        if (status !== 'granted') {
                            setErrorMsg('A permissão para acessar o local foi negada!');
                            return;
                        }

                        let location = await Location.getCurrentPositionAsync({});
                        setLocal({
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        });
                        reqAddress(reqLatitude, reqLongitude);
                    })();
                }
            } catch (e) {
                // error reading value
            }
        }
        storeData();

    }, []);

    const reqAddress = async (lat, Long) => { 
        let responseEndereco = await Location.reverseGeocodeAsync({
            latitude: lat,
            longitude: Long
        });
        for (let data of responseEndereco) {
            let address = {
                Bairro: data.district,
                Rua: data.street,
                Numero: data.streetNumber,
                Cidade: Platform.OS == 'ios' ? data.city : data.subregion,
                Estado: data.region,
            }
            setFullEndereco(address);
        }
    }

    const AbreModalEndereco = () => {
        if (fullEndereco != null) {
            setModalVisible(true)
        }
    }

    const fechaModal = () => {
        setModalVisible(false)
    }

    const handlerMainHome = () => {
        fechaModal()
        navigation.navigate('MainHome')
    }

    return (
        <Background colorBG={'black'}>
            {Platform.OS == 'ios' ?
                <StatusBar /> :
                <StatusBar hidden={true} />}
            <View style={css.containerMap}>
                <ModalEndereco
                    dataEndereco={fullEndereco}
                    visible={modalVisible}
                    closeModal={fechaModal}
                    nextTela={handlerMainHome}
                />
                {local != null ?
                    <MapView
                        zoomEnabled={true}
                        loadingEnabled={true}
                        region={local}
                        style={css.map}>
                        <Marker coordinate={local}>
                            <Image
                                style={css.StyleMarker}
                                source={require('../../Imgs/marker.png')}
                            />
                        </Marker>
                    </MapView>
                    :
                    null
                }

                <View style={css.containerAviso}>
                    <View style={css.BoxAviso}>
                        <Text style={css.txtAviso}>Arrastar o mapa para posicionar a ponta do marcador no seu local.</Text>
                    </View>
                </View>

                <View style={css.Footer}>
                    <BotaoNormal
                        txt={'CONFIRMAR LOCAL'}
                        colorBotao={CorAmareloPadrao}
                        acaoBotao={AbreModalEndereco}
                    />
                </View>
            </View>
        </Background>
    );
}
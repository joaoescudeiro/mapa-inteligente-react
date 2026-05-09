import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Modal, TextInput, Vibration } from 'react-native';
import firebase from '../services/firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function TelaPrincipal({ navigation }) {

    const [regiao, setRegiao] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeLocal, setNomeLocal] = useState('');
    const [locais, setLocais] = useState([]);
    const usuario = firebase.auth().currentUser;

    useEffect(() => {
        async function pegarLocalizacao() {

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Não foi possível acessar sua localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});

            setRegiao({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }

        firebase.firestore()
            .collection('locais')
            .where('usuarioId', '==', usuario.uid)
            .onSnapshot((querySnapshot) => {

                const lista = [];

                querySnapshot.forEach((doc) => {

                    lista.push({
                        id: doc.id,
                        ...doc.data()
                    });

                });

                setLocais(lista);
            });

        pegarLocalizacao();
    }, []);

    if (!regiao) {
        return <View style={styles.container} />;
    }

    async function salvarLocalizacao() {

        if (!nomeLocal.trim()) {
            Alert.alert('Erro', 'Digite um nome');
            return;
        }

        try {

            const usuario = firebase.auth().currentUser;

            await firebase.firestore().collection('locais').add({
                nome: nomeLocal,
                latitude: regiao.latitude,
                longitude: regiao.longitude,
                usuarioId: usuario.uid,
                data: new Date()
            });

            Alert.alert('Sucesso', 'Local salvo!');
            Vibration.vibrate(300);

            setNomeLocal('');
            setModalVisible(false);

        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    function sair() {
        firebase.auth().signOut();
        navigation.replace('Inicio');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textoBotao}>
                    Salvar Local
                </Text>
            </TouchableOpacity>

            <MapView
                style={styles.map}
                region={regiao}
                showsUserLocation={true}
            >
                {locais.map((local) => (
                    <Marker
                        key={local.id}
                        coordinate={{
                            latitude: local.latitude,
                            longitude: local.longitude
                        }}
                        title={local.nome}
                    />
                ))}
            </MapView>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >

                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitulo}>
                            Nome do Local
                        </Text>

                        <TextInput
                            placeholder="Digite o nome"
                            value={nomeLocal}
                            onChangeText={setNomeLocal}
                            style={styles.input}
                        />

                        <Button
                            title="Salvar"
                            onPress={salvarLocalizacao}
                        />

                        <Button
                            title="Cancelar"
                            onPress={() => setModalVisible(false)}
                        />

                    </View>

                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    botaoSalvar: {
        position: 'absolute',
        width: 170,
        height: 50,
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 10,
        elevation: 5,
        zIndex: 1,
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitulo: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
});
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import firebase from '../services/firebaseConfig';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function TelaPrincipal({ navigation }) {

    const [regiao, setRegiao] = useState(null);

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

        pegarLocalizacao();
    }, []);

    if (!regiao) {
        return <View style={styles.container} />;
    }

    async function salvarLocalizacao() {

        try {

            const usuario = firebase.auth().currentUser;

            await firebase.firestore().collection('locais').add({
                latitude: regiao.latitude,
                longitude: regiao.longitude,
                usuarioId: usuario.uid,
                data: new Date()
            });

            Alert.alert('Sucesso', 'Localização salva');

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
            <Text>Usuário logado</Text>
            <Button title="Sair" onPress={sair} />

            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarLocalizacao}
            >
                <Text style={styles.textoBotao}>Salvar Local</Text>
            </TouchableOpacity>

            <MapView
                style={styles.map}
                region={regiao}
                showsUserLocation={true}
            />
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
        top: 50,
        left: 20,
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 10,
        zIndex: 1,
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
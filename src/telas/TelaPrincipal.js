import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
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

    function sair() {
        firebase.auth().signOut();
        navigation.replace('Inicio');
    }

    return (
        <View style={styles.container}>
            <Text>Usuário logado</Text>
            <Button title="Sair" onPress={sair} />

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
});
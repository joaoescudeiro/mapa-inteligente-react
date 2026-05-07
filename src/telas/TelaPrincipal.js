import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../services/firebaseConfig';
import MapView from 'react-native-maps';

export default function TelaPrincipal({ navigation }) {

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
                initialRegion={{
                    latitude: -23.55052,
                    longitude: -46.633308,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
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
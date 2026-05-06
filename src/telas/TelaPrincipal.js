import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '../services/firebaseConfig';

export default function TelaPrincipal({ navigation }) {

    function sair() {
        firebase.auth().signOut();
        navigation.replace('Inicio');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Usuário logado</Text>

            <Button title="Sair" onPress={sair} />
        </View>
    );
}
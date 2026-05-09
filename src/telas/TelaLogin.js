import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../services/firebaseConfig';
import { Alert } from 'react-native';

export default function TelaLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar() {
        const emailFormatado = email.toLowerCase();

        firebase.auth()
            .signInWithEmailAndPassword(emailFormatado, senha)
            .then(() => {
                navigation.replace('Principal');
            })
            .catch(error => {
                const errorCode = error.code;

                if (errorCode === "auth/user-not-found")
                    Alert.alert("Erro", "Usuário não encontrado");
                else if (errorCode === "auth/wrong-password")
                    Alert.alert("Erro", "Senha incorreta");
                else if (errorCode === "auth/invalid-email")
                    Alert.alert("Erro", "Formato de e-mail inválido");
                else
                    Alert.alert("Erro", error.message);
            });
    }


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />

            <Button title="Entrar" onPress={logar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});
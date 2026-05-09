import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import firebase from '../services/firebaseConfig';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons
                name="person-circle-outline"
                size={110}
                color="#636363"
                style={styles.icone}
            />
            <Text style={styles.titulo}>
                Fazer Login
            </Text>

            <TextInput
                placeholder="Email"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#999"
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={logar}
            >

                <Text style={styles.textoBotao}>
                    Entrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#222',
    },
    input: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#3a59b5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icone: {
        alignSelf: 'center',
        marginBottom: 10,
    },
});
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import firebase from '../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function gravar() {
        const emailFormatado = email.toLowerCase();

        firebase.auth()
            .createUserWithEmailAndPassword(emailFormatado, senha)
            .then(async (userCredential) => {

                const usuario = userCredential.user;

                await firebase.firestore()
                    .collection('usuarios')
                    .doc(usuario.uid)
                    .set({
                        nome: nome,
                        email: emailFormatado
                    });

                Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
                navigation.replace('Principal');
            })
            .catch(error => {
                const errorCode = error.code;

                if (errorCode === "auth/email-already-in-use")
                    Alert.alert("Erro", "Esse e-mail já está em uso");
                else if (errorCode === "auth/weak-password")
                    Alert.alert("Erro", "Senha fraca (mínimo 6 caracteres)");
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
                Criar Conta
            </Text>

            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#999"
                autoCapitalize="none"
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
                onPress={gravar}
            >
                <Text style={styles.textoBotao}>
                    Cadastrar
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
    icone: {
        alignSelf: 'center',
        marginBottom: 10,
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
        backgroundColor: '#54aa57',
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
});
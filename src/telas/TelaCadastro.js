import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../services/firebaseConfig';
import { Alert } from 'react-native';


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
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

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

            <Button title="Cadastrar" onPress={gravar} />
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
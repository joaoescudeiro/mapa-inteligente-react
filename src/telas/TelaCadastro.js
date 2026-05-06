import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TelaCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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

            <Button title="Entrar" onPress={() => { }} />
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
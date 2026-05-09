import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function TelaInicio({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.titulo}>
                Mapa Inteligente
            </Text>

            <Text style={styles.subtitulo}>
                Gerencie seus locais favoritos
                com geolocalização inteligente
            </Text>

            <TouchableOpacity
                style={styles.botaoLogin}
                onPress={() =>
                    navigation.navigate('Login')
                }
            >
                <Text style={styles.textoBotao}>
                    Fazer Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoCadastro}
                onPress={() =>
                    navigation.navigate('Cadastro')
                }
            >
                <Text style={styles.textoBotao}>
                    Fazer Cadastro
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 40,
    },
    botaoLogin: {
        width: '80%',
        backgroundColor: '#3a59b5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    botaoCadastro: {
        width: '80%',
        backgroundColor: '#54aa57',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
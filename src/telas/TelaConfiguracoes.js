import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ModoSimulacaoContext } from '../context/ModoSimulacaoContext';

export default function TelaConfiguracoes() {

    const { modoSimulacao, setModoSimulacao, vibracaoAtiva, setVibracaoAtiva } = useContext(ModoSimulacaoContext);

    return (
        <View style={styles.container}>

            <View style={styles.linha}>

                <Text style={styles.texto}>
                    Modo Simulação
                </Text>

                <Switch
                    value={modoSimulacao}
                    onValueChange={setModoSimulacao}
                />

            </View>

            <View style={styles.linha}>

                <Text style={styles.texto}>
                    Vibração ao salvar local
                </Text>

                <Switch
                    value={vibracaoAtiva}
                    onValueChange={setVibracaoAtiva}
                />

            </View>

            <View style={styles.cardSobre}>

                <Text style={styles.tituloSobre}>
                    Sobre o Aplicativo
                </Text>

                <Text style={styles.textoSobre}>
                    Aplicativo desenvolvido para gerenciamento
                    inteligente de locais utilizando
                    geolocalização e simulação de GPS.
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    texto: {
        fontSize: 18,
    },
    cardSobre: {
        marginTop: 365,
        padding: 20,
        backgroundColor: '#b0d1fd',
        borderRadius: 10,
    },
    tituloSobre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    textoSobre: {
        fontSize: 15,
        color: '#555',
    },
});
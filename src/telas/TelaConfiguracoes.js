import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ModoSimulacaoContext } from '../context/ModoSimulacaoContext';

export default function TelaConfiguracoes() {

    const { modoSimulacao, setModoSimulacao } = useContext(ModoSimulacaoContext);

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
});
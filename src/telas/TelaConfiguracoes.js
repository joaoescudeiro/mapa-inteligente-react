import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function TelaConfiguracoes() {

    const [modoSimulacao, setModoSimulacao] = useState(false);

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
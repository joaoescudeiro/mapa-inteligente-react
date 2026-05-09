import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../services/firebaseConfig';

export default function TelaLocais() {

    const [locais, setLocais] = useState([]);

    useEffect(() => {

        const usuario = firebase.auth().currentUser;

        firebase.firestore()
            .collection('locais')
            .where('usuarioId', '==', usuario.uid)
            .onSnapshot((querySnapshot) => {

                const lista = [];

                querySnapshot.forEach((doc) => {

                    lista.push({
                        id: doc.id,
                        ...doc.data()
                    });

                });

                setLocais(lista);
            });

    }, []);

    async function excluirLocal(id) {

        try {

            await firebase.firestore()
                .collection('locais')
                .doc(id)
                .delete();

            Alert.alert('Sucesso', 'Local excluído');

        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={locais}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Text style={styles.nome}>
                            {item.nome}
                        </Text>

                        <Text>
                            Latitude: {item.latitude}
                        </Text>

                        <Text>
                            Longitude: {item.longitude}
                        </Text>

                        <TouchableOpacity
                            style={styles.botaoExcluir}
                            onPress={() => excluirLocal(item.id)}
                        >
                            <Text style={styles.textoBotao}>
                                Excluir
                            </Text>
                        </TouchableOpacity>

                    </View>

                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
    },

    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },

    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    botaoExcluir: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },

});
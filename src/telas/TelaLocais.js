import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import firebase from '../services/firebaseConfig';

export default function TelaLocais() {
    const [locais, setLocais] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeEditado, setNomeEditado] = useState('');
    const [localEditando, setLocalEditando] = useState(null);

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

    async function editarLocal() {
        try {
            await firebase.firestore()
                .collection('locais')
                .doc(localEditando.id)
                .update({
                    nome: nomeEditado
                });

            Alert.alert('Sucesso', 'Local atualizado');
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

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

    function abrirModalEdicao(local) {
        setLocalEditando(local);
        setNomeEditado(local.nome);
        setModalVisible(true);
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

                        <TouchableOpacity style={styles.botaoEditar} onPress={() => abrirModalEdicao(item)}>
                            <Text style={styles.textoBotao}>
                                Editar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirLocal(item.id)}>
                            <Text style={styles.textoBotao}>
                                Excluir
                            </Text>
                        </TouchableOpacity>

                        <Modal visible={modalVisible} transparent={true} animationType="slide">
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitulo}>
                                        Editar Local
                                    </Text>

                                    <TextInput value={nomeEditado} onChangeText={setNomeEditado} style={styles.input} />

                                    <TouchableOpacity style={styles.botaoEditar} onPress={editarLocal}>
                                        <Text style={styles.textoBotao}>
                                            Salvar Alterações
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.botaoExcluir} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.textoBotao}>
                                            Cancelar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
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
        backgroundColor: 'rgb(209, 64, 53)',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botaoEditar: {
        marginTop: 10,
        backgroundColor: '#3a59b5',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
});
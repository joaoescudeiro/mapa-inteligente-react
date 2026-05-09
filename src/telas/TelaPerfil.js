import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import firebase from '../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function TelaPerfil({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [novoNome, setNovoNome] = useState('');

    useEffect(() => {
        async function carregarUsuario() {
            const user =
                firebase.auth().currentUser;

            const dados =
                await firebase.firestore()
                    .collection('usuarios')
                    .doc(user.uid)
                    .get();
            setUsuario(dados.data());
        }
        carregarUsuario();
    }, []);

    function sair() {
        firebase.auth().signOut();
        navigation.replace('Inicio');
    }

    function editarPerfil() {
        setNovoNome(usuario.nome);
        setModalVisible(true);
    }

    async function salvarPerfil() {
        try {
            const user =
                firebase.auth().currentUser;

            await firebase.firestore()
                .collection('usuarios')
                .doc(user.uid)
                .update({
                    nome: novoNome
                });

            setUsuario({
                ...usuario,
                nome: novoNome
            });

            setModalVisible(false);

            Alert.alert(
                'Sucesso',
                'Perfil atualizado'
            );
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    if (!usuario) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.fotoContainer}>
                <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color="#555"
                />

                <Text style={styles.nome}>
                    {usuario.nome}
                </Text>
            </View>

            <Text style={styles.email}>
                {usuario.email}
            </Text>

            <TouchableOpacity style={styles.botaoEditar} onPress={editarPerfil}>
                <Text style={styles.textoBotao}>
                    Editar Perfil
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSair} onPress={sair}>
                <Text style={styles.textoBotao}>
                    Sair
                </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitulo}>
                            Editar Perfil
                        </Text>

                        <TextInput
                            value={novoNome}
                            onChangeText={setNovoNome}
                            style={styles.input}
                        />

                        <TouchableOpacity
                            style={styles.botaoEditar}
                            onPress={salvarPerfil}
                        >
                            <Text style={styles.textoBotao}>
                                Salvar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoSair}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textoBotao}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    fotoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    nome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 30,
        color: '#666',
    },
    botaoEditar: {
        width: '80%',
        backgroundColor: '#3a59b5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        alignSelf: 'center',
    },
    botaoSair: {
        width: '80%',
        backgroundColor: 'rgb(209, 64, 53)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
});
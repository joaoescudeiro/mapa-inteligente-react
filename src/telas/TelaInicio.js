import { Button, StyleSheet, Text, View } from 'react-native';

export default function TelaInicio({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Mapa Inteligente</Text>

            <Button
                title="Fazer Login"
                onPress={() => navigation.navigate('Login')}
            />

            <Button
                title="Fazer Cadastro"
                onPress={() => navigation.navigate('Cadastro')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});